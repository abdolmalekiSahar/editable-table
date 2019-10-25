import React, { Component } from 'react';
import Header from './header';
import Row from './row';
import './index.css'

export default class Table extends Component {
    state = {
        rows: [],
        isreverse: false,
        i: 0
    }

    addRow = row => {
        const { rows } = this.state;
        this.setState({ rows: [...rows, row] })
    }

    deleteRow = id => (a) => {
        const { rows } = this.state;
        rows.splice(rows.findIndex(row => row.id === id), 1);
        this.setState({ rows });
    }

    editRow = row => {
        const { rows } = this.state;
        rows[rows.findIndex(_row => _row.id === row.id)] = row;
        this.setState({ rows });
    }


    sortColumn = (name) => {
        const { rows, isreverse } = this.state;
        debugger
        if (name === 'age') {
            rows.sort((a, b) => {
                return a[name] - b[name]
            });
        } else {
            console.log(name);
            rows.sort((a, b) => {
                debugger
                let nameA = a[name];
                let nameB = b[name];
                if (nameA < nameB) //sort string ascending
                    return -1
                if (nameA > nameB)
                    return 1
                return 0 //default return value (no sorting)
            });
        }

        this.setState({ isreverse: !isreverse });

        if (!isreverse) {
            rows.reverse((a, b) => {
                debugger
                let nameA = a[name].toLowerCase();
                let nameB = b[name].toLowerCase();
                if (nameA > nameB) //sort string ascending
                    return -1
                if (nameA < nameB)
                    return 1
                return 0 //default return value (no sorting)
            });
        }

        this.setState({ rows });
    }

    nextPage = () => {
        const { i,rows } = this.state;
        if (i < rows.length-5){
            this.setState({ i: i + 5 })
        }
        
    }
    prePage = () => {
        const { i } = this.state;
        debugger
        if (i >= 5){
            this.setState({ i: i - 5 })
        }
    }

    render() {
        const { rows, i } = this.state;
        const { addRow, deleteRow, editRow, props: { columns } } = this;
        return <> {/* <React.Fragment> */}
            <h1>Editable Table</h1>
            <table>
                <Header
                    columns={columns}
                    addRow={addRow}
                    sortColumn={this.sortColumn}
                />
                <tbody>
                    {rows.map(row => <Row key={row.id} row={row} columns={columns} onDelete={deleteRow(row.id)} onEdit={editRow} />).slice(i, i + 5)}
                </tbody>
            </table>
            <div 
            className='page' 
            style={{textAlign:'center',marginTop:'10px'}}><button
                    onClick={this.prePage}>pre</button>
                    <span style={{padding:'10px'}}>{Math.floor(i/5)+1}/{Math.ceil(rows.length/5)? Math.ceil(rows.length/5):1}</span>
                    <button
                    onClick={this.nextPage}>next</button>
                </div>
        </>
    }
}