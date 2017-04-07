import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';

export default class BasicTable extends React.Component {

  onSelectAll = (isSelected) => {
    if (isSelected) {
      return this.refs.table.state.data.map(row => row.author)
    }
  }

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelectAll: this.onSelectAll
    }

    const { posts, tableStyle } = this.props

    let dataSource = []

    posts.forEach((item) => {
      dataSource.push({
        author: item.author,
        created: moment(new Date(item.created)).format('LL'),
        title: item.title
      })
    })

    //console.log(dataSource)

    return (
      <BootstrapTable ref='table'
                      data={dataSource}
                      containerClass={tableStyle}
                      selectRow={selectRowProp}
                      pagingEnabled={true}
                      pagination
                      bordered={false}
                      striped
                      hover>
        <TableHeaderColumn dataField='author' isKey={true} dataSort={true}>Author</TableHeaderColumn>
        <TableHeaderColumn dataField='created'>Created</TableHeaderColumn>
        <TableHeaderColumn dataField='title' columnClassName='col1'>Title</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}


