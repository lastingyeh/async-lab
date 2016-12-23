import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../actions'
import Picker from '../components/Picker'

import Table from '../components/Table'

class App extends Component {
    static propTypes = {
        selectedReddit: PropTypes.string.isRequired,
        posts: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired,
    }
    //default loading...
    //s1.
    componentDidMount() {
        //dispatch props from Connect(App) given...
        const {dispatch, selectedReddit} = this.props
        console.log('dispatch:', dispatch(fetchPostsIfNeeded(selectedReddit)))
        dispatch(fetchPostsIfNeeded(selectedReddit))

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit} = nextProps
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    handleChange = nextReddit => {
        this.props.dispatch(selectReddit(nextReddit))
    }

    handleRefreshClick = e => {
        e.preventDefault()

        const {dispatch, selectedReddit} = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const {selectedReddit, posts, isFetching, lastUpdated} = this.props
        const isEmpty = posts.length === 0
        return (
            <div className="container">
                <Picker value={selectedReddit}
                        onChange={this.handleChange}
                        options={['reactjs', 'frontend']}/>
                <p>
                    {lastUpdated &&
                    <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>}

                    {!isFetching && <a href="#" onClick={this.handleRefreshClick}>Refresh</a>}
                </p>

                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Table posts={posts} tableStyle="tableStyle"/>
                    </div>
                }
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {selectedReddit, postsByReddit} = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(App)
