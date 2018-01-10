import React, { Component } from 'react';
import WorkItem from './WorkItem';

class WorkList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1 // all: -1, finish : 1 , unfinish: 0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name==='filterName' ? value : this.state.filterName,
            name==='filterStatus' ? value : this.state.filterStatus,
            )
        this.setState ({
            [name]:value
        });     
    }

  render() {
    var {works} = this.props;
    var {filterName,filterStatus}=this.state;

    var elmWorks = works.map((work,index)=>{
        return <WorkItem 
                        key={work.id} 
                        works={work} 
                        index={index} 
                        onUpdateStatus = {this.props.onUpdateStatus}
                        onDeleteWork={this.props.onDeleteWork}
                        onUpdateWork = {this.props.onUpdateWork}/>
    });

    return (

          <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th  className="text-center">No.</th>
                    <th  className="text-center">Name</th>
                    <th  className="text-center">Status</th>
                    <th  className="text-center">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                        type="text" 
                        name="filterName" 
                        className="form-control"
                        value = { filterName }
                        onChange= {this.onChange}/>
                    </td>
                    <td>
                        <select 
                        name="filterStatus"
                        className="form-control"
                        value = { filterStatus }
                        onChange= {this.onChange}>
                            <option value={-1}>All</option>
                            <option value={0}>Only Finished</option>
                            <option value={1}>Only Unfinish</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
            </tbody>

            <tbody>
                {elmWorks}
            </tbody>

        </table>

    );
  }
}

export default WorkList;
