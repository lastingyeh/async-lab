import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'

class CardView extends Component {

    static defaultProps = {
        author: '',
        created: '',
        title: '',
        onClick: () => {
        },
    }

    static propTypes = {
        author: PropTypes.string,
        created: PropTypes.string,
        title: PropTypes.string,
        onClick: PropTypes.func,
    }

    render() {

        let {author, created, title, onClick} = this.props

        return (
            <Grid className="card-container" onClick={() => onClick(author)}>
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