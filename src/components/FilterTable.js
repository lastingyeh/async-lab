import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const FilterTable = (props) => {

    let qualityType = {
        0: 'good',
        1: 'bad',
        2: 'unknown',
    };

    let onSelectRow = (row, isSelected, e) => {

        //console.info('row selected', row['id'])


    }

    let onSelectAll = (isSelected, rows) => {

        return rows.map(item => item['id']).filter(id => id > 3);
    }


    let selectRowProp = {
        mode: 'checkbox',
        bgColor: '#ffe6e6',
        clickToSelect: true, //as click row to trigger select || checkbox checked
        onSelect: onSelectRow,
        onSelectAll,

    };

    //enumObject = (formatExtraData = {qualityType})
    let enumFormatter = (cell, row, enumObject) => enumObject[cell];

    return (
        <BootstrapTable data={props.dataSource} selectRow={selectRowProp}>
            <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='quality'
                               filterFormatted
                               dataFormat={enumFormatter}
                               formatExtraData={qualityType}
                               filter={{
                                   type: 'SelectFilter',
                                   placeholder: 'select quality',
                                   options: qualityType,
                               }}
                               width='200'/>

        </BootstrapTable>
    )

}

FilterTable.propTypes = {
    dataSource: React.PropTypes.array.isRequired
}

export default FilterTable;
