import logo from './logo.svg';
import './App.css';
import './TodoList.js';
import TodoList from './TodoList.js';
import React from 'react';

// DataList: [{ data:Id:0,"name": "item 1", "time": "3/22/2022, 4:46:31 PM", "status": 1 ,isChecked: false ,isEdit: false}],

class App extends React.Component {

  filterList = [];

  constructor(props) {
    super(props);
    let StorageData = JSON.parse(window.localStorage.TodoData ? window.localStorage.TodoData : '[]');
    this.state = {
      DataList: (StorageData.DataList ? StorageData.DataList : []),
      editItemId: -1,
      showActiveId: -1,
      sortid: 1,
      addNewStatus: false,
      searchStatus: false,
      filterchar: 'null',
    }
    this.TodoListref = React.createRef();
    this.SetLocalStorage();
  }

  SetLocalStorage() {
    window.localStorage.setItem('TodoData', JSON.stringify(this.state));
  }

  AddNewRecord = (event) => {
    event.preventDefault();
    let newRecord = {
      dataId: (this.state.DataList.length + 1),
      name: event.target.newName.value,
      time: new Date().toLocaleString(),
      status: 1,
      isChecked: false,
    }
    this.state.DataList.push(newRecord)
    this.setState({
      DataList: this.state.DataList,
      addNewStatus: false
    })
    this.SetLocalStorage();
  }

  UpdateStatus = (id) => {
    this.state.DataList.forEach((data,index)=>{
      if(data.dataId == id){
        this.state.DataList[index].status = this.state.DataList[index].status == 1? 0:1
      }
    })
    this.setState({
      DataList: this.state.DataList
    })
  }

  editItem = (id) => {
    this.setState({ editItemId: id })
  }

  updateItem(event) {
    let newName = event.target.updateName.value;
    this.state.DataList[this.state.editItemId].name = newName
    this.setState({
      DataList: this.state.DataList
    })
    this.SetLocalStorage()
  }

  removeItem = (id) => {
    this.state.DataList.splice(id, 1);
    this.setState({
      DataList: this.state.DataList
    })
    this.SetLocalStorage();
  }

  showActive = (id) => {
    this.setState({ showActiveId: id });
  }

  sortChange(id) {
    this.setState({ sortid: id });
  }

  actionChage(id) {
    if (id == 1) {
      this.state.DataList.forEach((data) => {
        data.isChecked = !data.isChecked;
      })
    }
    else if (id == 2) {
      this.state.DataList.forEach((data, index) => {
        if (data.isChecked) {
          this.state.DataList.splice(index, 1);
        }
      })
    }
    else if (id == 3) {
      this.state.DataList = [];
    }
    this.setState({ DataList: this.state.DataList });
    this.SetLocalStorage();
  }

  seachRecord(event) {
    this.setState({ filterchar: event.target.value });
  }

  handleCheck = (id) => {
    this.state.DataList.forEach((data) => {
      if(data.dataId == id){
      data.isChecked = !data.isChecked;}
    })
    this.setState({
      DataList: this.state.DataList
    })
  }

  renderForm() {
    if (this.state.addNewStatus) {
      return (<div>
        <form className='card' onSubmit={this.AddNewRecord}>
          <label>Enter Name : </label>
          <input type="text" className="form-control " name='newName' id="newName" placeholder="Enter Name"
          />
          <input type="submit" className='btn btn-primary ' value="Add" />
        </form>
      </div>);
    } else if (this.state.editItemId != -1) {
      return (<div>
        <form className='card' onSubmit={(event) => this.updateItem(event)}>
          <label>Updaet Name : </label>
          <input type="text" className="form-control " name='updateName' id="updateName" placeholder="Enter Name"
            defaultValue={this.state.DataList[this.state.editItemId].name}
          />
          <input type="submit" className='btn btn-primary ' value="Update" />
        </form>
      </div>);
    } else if (this.state.searchStatus) {
      return (<div className='card' >
        <label>Search Name : </label>
        <input type="text" className="form-control " name='searchName' id="searchName" placeholder="Enter Name" onKeyUp={(event) => this.seachRecord(event)} />
        <button class="btn btn-light" id="search" onclick="showInput('Search Here.')" onClick={() => this.setState({ searchStatus: !this.state.searchStatus, addNewStatus: false })}><i
          class="bi bi-x-square"></i></button>
      </div>);
    }
  }

  updateTableRecords(DataList = []) {
    let newList = [];
    let chr = this.state.filterchar;
    let activeId = this.state.showActiveId
    if (this.state.searchStatus || this.state.showActiveId != -1) {
      DataList.forEach((data) => {
        if (data.name.indexOf(chr) != -1 || data.status == activeId) {
          newList.push(data)
        }
      })
    }
    else {
      newList = this.state.DataList;
    }
    this.filterList = newList
  }

  render() {
    this.updateTableRecords(this.state.DataList);
    let formDiv = this.renderForm();

    return (
      <div className="App ">
        <div className="App-header container card">
          <header className='card-header'>
            <h3>Things To Do</h3>
          </header>
          <div className='card-body'>

            {formDiv}
            <TodoList DataList={this.filterList} sortid={this.state.sortid} UpdateStatus={this.UpdateStatus} editItem={this.editItem} removeItem={this.removeItem} ref={this.TodoListref} handleCheck={this.handleCheck} />
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-2">
                <button className="btn  btn-primary" id="addNew" onClick={() => this.setState({ addNewStatus: !this.state.addNewStatus, searchStatus: false })}><i className="bi bi-plus-lg"></i></button>
                <button className="btn  btn-primary" id="search" onClick={() => this.setState({ searchStatus: !this.state.searchStatus, addNewStatus: false })}><i className="bi bi-search"></i></button>

              </div>

              <select id="btnaction" className="col-2 custom-select" defaultValue={'0'} onChange={e => this.actionChage(e.target.value)}>
                <option value="0" disabled >Action</option>
                <option value="1">Select All</option>
                <option value="2">Delete Selected</option>
                <option value="3">Delete All</option>
              </select>
              <div className="col-2">
                Total Records : <span id="totalSpan">{this.filterList.length}</span>
              </div>
              <select id="btnSort" className="col-2 custom-select" defaultValue={'0'} onChange={e => this.sortChange(e.target.value)}>
                <option value="0" disabled >Sort</option>
                <option value="1">Name A To Z</option>
                <option value="2">Name Z To A</option>
                <option value="3">Date Ascending</option>
                <option value="4">Date Descending</option>
              </select>
              <div className="col-3">
                <button className={'btn ' + (this.state.showActiveId == -1 ? 'btn-primary' : '')} onClick={() => this.showActive(-1)}>All</button>
                <button className={'btn ' + (this.state.showActiveId == 1 ? 'btn-primary' : '')} onClick={() => this.showActive(1)}>Active</button>
                <button className={'btn ' + (this.state.showActiveId == 0 ? 'btn-primary' : '')} onClick={() => this.showActive(0)}>Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
