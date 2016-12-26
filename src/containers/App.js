import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../actions'
import Picker from '../components/Picker'

import Table from '../components/Table'
import ViewAdapter from '../components/ViewAdapter'
import CardView from '../components/CardView';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobileSize: false
        }
    }

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

        dispatch(fetchPostsIfNeeded(selectedReddit))

        if (!this.detectMobile()) {
            this.onResponseDetect()
            window.onresize = () => this.onResponseDetect()
        }
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

    detectMobile = () => {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    onResponseDetect = () => {

        if (window.innerWidth <= 800) {
            this.setState({
                isMobileSize: true
            });
        } else {
            this.setState({
                isMobileSize: false
            })
        }
    }

    onCellClick = (e) => {
        console.log('trigger onCellClick',e)
    }

    render() {

        const {selectedReddit, posts, isFetching, lastUpdated} = this.props
        const isEmpty = posts.length === 0

        let newData = []
        let view = {}
        //create data for ViewAdapter
        if (posts && posts.length > 0) {

            posts.forEach((item) => newData.push({
                author: item.author,
                created: moment(new Date(item.created)).format('LL'),
                title: item.title
            }))

            view = <ViewAdapter viewSet={<CardView onClick={this.onCellClick}/>} dataList={newData}/>
        }

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

                {isEmpty ?
                    (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    :
                    (this.state.isMobileSize ?
                        view
                        :
                        <div style={{opacity: isFetching ? 0.5 : 1}}>
                            <Table posts={posts} tableStyle="tableStyle"/>
                        </div>)
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
