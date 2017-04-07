import React from 'react';
import ReactDataGrid from 'react-data-grid';

const DataGrid = () => {

    //generate random date
    const randomDate =
        (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();

    //build rows
    let _rows = [];

    for (let i = 1; i < 1000; i += 1) {

        _rows.push({
            id: i,
            task: 'Task' + i,
            complete: Math.min(100, Math.round(Math.random() * 110)),
            priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
            issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
            startDate: randomDate(new Date(2015, 3, 1), new Date()),
            completeDate: randomDate(new Date(), new Date(2016, 0, 1))
        });
    }

    //get row
    const rowGetter = (index) => {
        return _rows[index];
    }

    //build columns
    let columns = [
        {
            key: 'id',
            name: 'ID',
            resizable: true,
            width: 40
        },
        {
            key: 'task',
            name: 'Title',
            resizable: true
        },
        {
            key: 'priority',
            name: 'Priority',
            resizable: true
        },
        {
            key: 'issueType',
            name: 'Issue Type',
            resizable: true
        },
        {
            key: 'complete',
            name: '% Complete',
            resizable: true
        },
        {
            key: 'startDate',
            name: 'Start Date',
            resizable: true
        },
        {
            key: 'completeDate',
            name: 'Expected Complete',
            resizable: true
        }];

    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={_rows.length}
            minHeight={500}
        />
    )
}

export default DataGrid;