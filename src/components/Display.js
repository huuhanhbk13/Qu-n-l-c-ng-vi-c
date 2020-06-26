import React, { Component } from 'react';
import TaskItem from './TaskItem';
import AddJob from './AddJob';
import UpdateJob from './UpdateJob';

var ls = require('local-storage');
const cryptoRandomString = require('crypto-random-string');
class Display extends Component {
constructor(props) {
    super(props);
    this.state={
      tasks:[],
      isDisplayForm: false,
      isDisplayUpdate:false,
      index: null,
      taskEditing: null,
      taskEditingStatus: null
    }
}
onClose=()=>{
  if(this.state.isDisplayForm===false){
    this.setState({
      isDisplayForm: true
    });
  }
 else {
   this.setState({
    isDisplayForm: false
  });
 }
}
onOpen=()=>{
  if(this.state.isDisplayUpdate===false){
    this.setState({
      isDisplayUpdate: true
    });
  }
 else {
   this.setState({
    isDisplayUpdate: false
  });
 }
}
onSubmit=(data)=>{
  var {tasks}=this.state;
  data.id=cryptoRandomString({length: 10, type: 'numeric'});
  tasks.push(data);
  this.setState({
    tasks: tasks
  });
  ls('tasks', tasks);
}
onSort=()=>{
  var {tasks}= this.state;
  tasks.sort(function(a, b){
        if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
        if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
        return 0;
    });
  this.setState({
    tasks: tasks
  });
}
onUpdateStatus=(id)=>{
  var {tasks}=this.state;
  var index=this.FindIndex(id);
  if(index!==-1){
    tasks[index].status= ! tasks[index].status;
  }
  this.setState({
    tasks: tasks
  });
}
FindIndex(data){
  var {tasks}=this.state;
  var result=-1;
  tasks.forEach((task, index)=>{
    if(task.id===data){
      result=index;
      return result;
    }
  });
  return result;
}


onRemove=(data)=>{
  var {tasks}=this.state;
  var index=this.FindIndex(data);
  if(index!==-1){
    tasks.splice(index,1);
  }
  this.setState({
    tasks:tasks
  });
}
onUpdate=(data)=>{
  var {taskEditingStatus}=this.state;
  var {index}=this.state;
  var {tasks}=this.state;
  var {taskEditing}=this.state;
  taskEditing=data.name;
  taskEditingStatus=data.status;
  console.log(taskEditing);
  tasks[index].name=taskEditing;
  tasks[index].status=taskEditingStatus;
  this.setState({
    tasks: tasks
  });
}
onFix=(data)=>{
  var index=this.FindIndex(data);
  this.setState({
    index: index
  });
}

render(){
    var {tasks}=this.state;
    var elmTask=tasks.map((task, index)=>{
      return <TaskItem
          key={task.id}
          id={task.id}
          Stt={index}
          name={task.name}
          status={task.status}
          onUpdateStatus={this.onUpdateStatus}
          onFix={this.onFix}
          onRemove={this.onRemove}
          onOpen={this.onOpen}
          onUpdate={this.onUpdate}
      />
    });
    var {isDisplayForm}=this.state;
    var {isDisplayUpdate}=this.state;
    var elmTaskForm=isDisplayForm 
    ? <AddJob  
    onSubmit={this.onSubmit} 
    onCloseForm={this.onClose} /> 
    :'';
  
    var elmUpdateTask=isDisplayUpdate
    ? <UpdateJob 
    onUpdate={this.onUpdate}
    onOpen={this.onOpen}
    FindIndex={this.FindIndex}
    /> 
    :'';
    
    return (
    <div className="row ">
    {elmTaskForm}
    {elmUpdateTask}
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">    
          <button type="button" className="btn btn-info" id='ml' onClick={this.onClose}>
          <i className="fas fa-plus"></i>&nbsp;
            Thêm Công Việc
          </button>        
          <input type="search" id='search' className="form-control ml-20" placeholder='Nhập từ khóa...'/>
          <button type="submit" className="btn btn-primary ml-10"
          >Tìm &nbsp;
          <i className="fas fa-search"></i>
          </button>
          <button className='btn btn-warning p' onClick={this.onSort}>
            Sắp xếp &nbsp;
          <i className="fas fa-sort"></i>
          </button>
            <table className="table table-bordered table-hover ml-30">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td><input type='text' className='form-control'></input></td>
                  <td>
                  <select id="input" className="form-control" >
                      <option value="-1">Tất cả</option>
                      <option value="0">Ẩn</option>
                      <option value="1">Kích hoạt</option>
                    </select>
                  </td>
                  <td></td>
                </tr>
                {elmTask}
              </tbody>
            </table>
          </div>
        </div>
);
}
}
export default Display;

