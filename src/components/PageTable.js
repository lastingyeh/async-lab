import React, {Component, PropTypes} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class PageTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            currPage: 1,
        }

        //this.selectItems = [];
    }

    static propTypes = {
        dataSource: PropTypes.array.isRequired,
    }

    columnList = (dataSource) => {

        if (dataSource && dataSource.length > 0) {

            let columns = [];

            for (let p in dataSource[0]) {
                if (dataSource[0].hasOwnProperty(p)) {
                    columns.push(p);
                }
            }

            return columns;
        }
    }

    onRowSelect = ({id}, isSelected) => {

        if (isSelected) {
            this.setState({
                selected: [...this.state.selected, id].sort(),
                currPage: this.refs.table.state.currPage
            });
        } else {
            this.setState({selected: this.state.selected.filter(it => it !== id)});
        }
        //return false;

    }

    onSelectAll = (isSelected, rows) => {

        let ids = rows.map(item => item.id);

        if (isSelected) {
            this.setState({
                selected: [...this.state.selected, ...ids]
            });
        } else {
            this.setState({
                selected: this.state.selected.filter(it => rows.indexOf(it) !== -1)
            })
        }

    }

    onTest = () => {
        console.log('selected', this.state.selected);
    }

    render() {
        let {dataSource} = this.props;
        let {currPage, selected} = this.state;

        let selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onRowSelect,
            selected,
            onSelectAll: this.onSelectAll
        };

        let options = {
            sizePerPageList: [5, 10, 15, 20],
            sizePerPage: 10,
            page: currPage,
            sortName: 'id',
            sortOrder: 'desc',
        };

        let columns = this.columnList(dataSource);

        return (
            <div>
                <input type="button" onClick={this.onTest} value='Test'/>
                <hr/>
                <BootstrapTable ref='table'
                                data={dataSource}
                                keyField={columns[0]}
                                selectRow={selectRowProp}
                                options={options}
                                pagination>
                    {[columns.map(item => <TableHeaderColumn dataField={item}>{item}</TableHeaderColumn>)]}
                </BootstrapTable>
            </div>

        )
    }
}

export default PageTable;
