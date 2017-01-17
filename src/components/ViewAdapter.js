import React from 'react';

class ViewAdapter {

    static getViews(viewSet, newData) {

        let dataUseList = newData.map((data, index) => {

            let props = {}

            for (let pKey in data) {

                if (!data.hasOwnProperty(pKey)) continue

                props[pKey] = data[pKey]
            }

            return React.cloneElement(viewSet, {...props, key: index});
        })

        return dataUseList
    }
}

export default ViewAdapter
