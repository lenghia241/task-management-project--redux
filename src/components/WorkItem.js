import React, { Component } from 'react';

class WorkItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.works.id)
    }

    onDeleteWork = () => {
        this.props.onDeleteWork(this.props.works.id)
    }

    onUpdateWork = () => {
        this.props.onUpdateWork(this.props.works.id)
    }


  render() {

    var {works, index} = this.props;

    return (
        
        <tr>
            <td> {index+1} </td>

            <td> {works.name} </td>

            <td className="text-center">
              <span className={ works.status ? "label label-danger" : "label label-success"}
                    onClick= {this.onUpdateStatus}
              >{ works.status ? "Finished" : "Unfinish"}</span>
            </td>

            <td className="text-center">
                <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={this.onUpdateWork}
                >
                <span className="fa fa-pencil mr-5"></span>Fixing
                </button>
                &nbsp;
                <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.onDeleteWork}>
                <span className="fa fa-trash mr-5"></span>Delete
                </button>
            </td>

        </tr>
        
    );
  }
}

export default WorkItem;
