import React, { Component } from 'react';
class TaskItem extends Component {
 
  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.id);
  }
  onFix=()=>{
   this.props.onOpen();
   this.props.onFix(this.props.id);
  }
  onRemove=()=>{
    this.props.onRemove(this.props.id);
  }
  
render(){
  var status=String(this.props.status);
  var tt=status==='true' ? 'Kích hoạt' :'Ẩn';
  return (
    <tr>
    <td>{this.props.Stt}</td>
    <td>{this.props.name}</td>
    <td>
      <span className={status==='false' ? 'label label-danger': 'label label-success'} onClick={this.onUpdateStatus}>
        {tt}
      </span>
    </td>
    <td>
      <button type="button" className="btn btn-success" onClick={this.onFix}>Sửa</button>  &nbsp;
      <button type="button" className="btn btn-danger" onClick={this.onRemove}>Xóa</button>
    </td>
  </tr>
);
}
}
export default TaskItem;
