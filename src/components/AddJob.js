import React, { Component } from 'react';
class AddJob extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            name:[], // id:unique, name, status
            status: true
        }
    }
  
    changeHandler = (event) => {   // Lấy giá trị ở ô input
       var target = event.target;
       var name =target.name;
       var value= target.value;
       if(name==='status'){
           value=target.value ==='true' ? true :false
       } 
       this.setState({
          [name]: value
        });
      }
   
    onSave=()=>{           // lưu vào công việc vào Task 
        this.props.onCloseForm();
        this.props.onSubmit(this.state);
      }
    onReset=()=>{         // reset lại form
        this.setState({
            name: '',
            status: ''
        });
    }
    onSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);

    }
    render(){
        
        return (
    <div className="row ml">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <form id='myform' onSubmit={this.onSubmit}>
                <legend>
                   Thêm Công Việc
                   <i className="fas fa-times fa-sm aj" onClick={this.props.onCloseForm}></i>
                </legend>
                <div className="form-group">
                    <label>Tên:</label>
                    <input 
                    type='text' 
                    className='form-control' 
                    name='name' 
                    value={this.state.name}
                    onChange={this.changeHandler}
                    /><br/>
                    <label>Trạng thái:</label>
                    <select 
                    className="form-control"
                     name='status' 
                     value={this.state.status}
                     onChange={this.changeHandler}>
                        <option value={false} >Hidden</option>
                        <option value={true}>Active</option>
                    </select>
                    <div className='PBtn'>
                        <button type="button" className="btn btn-success" onClick={this.onSave}>Save</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onReset}>Reset</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
);
}
}
export default AddJob;
