import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'

class CardView extends Component {

    static defaultProps = {
        author: '',
        created: '',
        title: '',
        onPress: () => {
        },
    }

    static propTypes = {
        author: PropTypes.string,
        created: PropTypes.string,
        title: PropTypes.string,
        onPress: PropTypes.func,
    }

    render() {

        let {author, created, title, onPress} = this.props
        //As onClick-event triggered, run onPress(author,title) func (implements in App's onHandleClick)
        //onClick -> onPress(author,title) -> onHandleClick
        return (
            <Grid className="card-container" onClick={() => onPress(author,title)}>
                <Row>
                    <Col xs={4}>
                        <h3>{author}</h3>
                        <p>{created}</p>

                    </Col>
                    <Col xs={8} className="card-content">
                        <Panel header="content">
                            {title}
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default CardView