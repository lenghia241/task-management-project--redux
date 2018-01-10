import React, { Component } from 'react';


class WorkForm extends Component {

    constructor (props) {
        super(props);
        this.state= {
            id: '',
            name: '',
            status: true
        }
    }

    componentWillMount() {
        if(this.props.workEditing) {
            this.setState({
                id: this.props.workEditing.id,
                name: this.props.workEditing.name,
                status: this.props.workEditing.status
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.workEditing) {
            this.setState({
                id:nextProps.workEditing.id,
                name: nextProps.workEditing.name,
                status: nextProps.workEditing.status
            });
        } else if (nextProps && nextProps.workEditing === null) {
            this.setState ({
                id: '',
                name: '',
                status: true
            });
        }
    }

    handleOnChange = (event) => {
        var target= event.target;
        var name = target.name;
        var value = target.value;
        if (name ==='status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]:value
        });
    }

    sendCloseForm = () => {
        this.props.closeForm();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addToState(this.state);
        this.clearForm();
        this.sendCloseForm();
    }

    clearForm = () => {
        this.setState ({
            name: '',
            status: true
        });
    }

  render() {

    var {id} = this.state;
    return (

  <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 
            className="panel-title">{id !== '' ? 'Update current work' : 'Add work to do' }
            <span   className="fa fa-times-circle text-right"
                    onClick= {this.sendCloseForm}></span>
            </h3>
        </div>
        <div className="panel-body">

            <form onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" 
                            className="form-control" 
                            name="name"
                            value= {this.state.name}
                            onChange={this.handleOnChange} />
                </div>

                <label>Status: </label>
                <select 
                name="status" 
                id="input" 
                className="form-control"
                value= {this.state.status}
                onChange={this.handleOnChange}>

                    <option value={true}>Finished</option>
                    <option value={false}>Unfinish</option>

                </select><br/>

                <button type="submit" className="btn btn-warning">
                <span   className="fa fa-plus mr-5"
                        ></span>
                Submit
                </button>
                &nbsp;
                <button type="button" 
                        className="btn btn-danger"
                        onClick={this.clearForm}>
                <span   className="fa fa-close mr-5 pt-5"></span>
                Cancel
                </button>

            </form>
        </div>
  </div>
                  
    );
  }
}


export default WorkForm;
