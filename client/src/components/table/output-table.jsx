import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as _ from 'lodash';
import "./table.css";

export default class OutputTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderTableData = this.renderTableData.bind(this);
        this.buildTableDataRow = this.buildTableDataRow.bind(this);
        this.buildTableHeaderRow = this.buildTableHeaderRow.bind(this); 
    }

    renderTableData() {
        return this.props.data.map((dataField, index) => this.buildTableDataRow(dataField, index))
    }

    buildTableDataRow(dataField, index) {
        return (
            <TableRow key={index}>
                <TableCell>{index}</TableCell>
                {_.values(dataField).map(field => {
                    return <TableCell align="right">{field}</TableCell>
                })}
            </TableRow>
        )
    }

    buildTableHeaderRow(dataField) {
        return (
            <TableRow>
                <TableCell></TableCell>
                {_.keys(dataField).map(field => {
                    return <TableCell align="right">{field}</TableCell>
                })}
            </TableRow>
        )
    }

    render() {
        //get first element of return, if any
        if (!this.props.data) return <div> No data prop even returned to element </div>
        if (this.props.data.length === 0) {
            return (
                <div className="noResult">
                    Your query returned 0 results :(
                </div>
            )
        }
        return (
            <TableContainer id="table" component={Paper}>
                <Table className="output-table" size="small" aria-label="a dense table">
                <TableHead>
                    {this.buildTableHeaderRow(this.props.data[0])}
                </TableHead>
                <TableBody>
                    {this.renderTableData()}
                </TableBody>
                </Table>
            </TableContainer>
        );
    }
}
