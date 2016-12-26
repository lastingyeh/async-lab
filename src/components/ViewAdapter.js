import React, {Component, PropTypes} from 'react'

class ViewAdapter extends Component {

    static propTypes = {
        viewSet: PropTypes.element.isRequired,
        dataList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
    }

    render() {
        const {viewSet, dataList} = this.props

        let dataUseList = dataList.map((data, index) => {

            let props = {}

            for (let pKey in viewSet.type.propTypes) {
                if (!viewSet.type.propTypes.hasOwnProperty(pKey)) continue;

                props[pKey] = data[pKey]
            }

            return React.cloneElement(viewSet, {...props, key: index});
        })

        console.log('dataUseList', dataUseList)

        return (
            <div>
                {dataUseList}
            </div>

        )
    }
}

export default ViewAdapter
