import logo from './logo.svg';
import './App.css';
import React from 'react';
import App from './App.js';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: this.props.DataList
        }
    }
    sortList(sortid, dataList) {
        if (sortid == 1) {
            return dataList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        } else if (sortid == 2) {
            return dataList.sort((a, b) => (a.name < b.name) ? 1 : -1);
        } else if (sortid == 3) {
            return dataList.sort((a, b) => (a.time > b.time) ? 1 : -1);
        } else if (sortid == 4) {
            return dataList.sort((a, b) => (a.time < b.time) ? 1 : -1);
        }
    }

    render() {
        let tableBody;
        if (this.props.DataList.length) {
            let dataList = this.sortList(this.props.sortid, this.props.DataList);
            tableBody =
                dataList.map((item, index) => (
                    <tr key={index} >
                        <td><input className="form-check-input" type="checkbox" value={item.dataId} 
                        onClick={(event) => this.props.handleCheck(item.dataId)} id={index} defaultChecked={item.isChecked ? true:false} 
                        /></td>
                        <td>{index + 1}</td>
                        <th className={index} scope="row">{item.name}</th>
                        <td>{item.time}</td>
                        <td>{item.status == 1 ? 'Active' : 'Completed'}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => this.props.UpdateStatus(item.dataId)}> {item.status != 1 ? 'Active' : 'Completed'}</button>
                            <button className="btn btn-secondary" onClick={() => this.props.editItem(index)}> <span className="bi bi-pen"></span></button>
                            <button className="btn btn-danger" onClick={() => this.props.removeItem(index)}> <span className="bi bi-x-square"></span></button>
                        </td>
                    </tr>
                )
                )
        } else {
            tableBody = <tr>
                <td colSpan={6}> Data Not Avaible</td>
            </tr>
        }
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date & Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        );
    }
}

export default TodoList;
