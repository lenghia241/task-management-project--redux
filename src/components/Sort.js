import React, { Component } from 'react';

class Sort extends Component {

  constructor (props) {
    super (props);
    this.state = {
      sort : {
        by: 'name',
        value: 1
      }
    }
  }

  onClick = (sortBy, sortValue) => {
    this.setState ({
      sort: {
        by: sortBy,
        value: sortValue
      }
    });
    this.props.onSort(sortBy, sortValue);
  }
  render() {

    var {sort} =this.state;

    return (

        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="drop-down">
                  <button
                  className="btn btn-primary dropdown-toggle"
                  type="button" 
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  >

                  Arrange <span className="fa fa-caret-square-o-down ml-5"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                      <li onClick= {()=> this.onClick('name',1)}>
                          <a 
                          role="button" 
                          className= {(sort.by === 'name' && sort.value ===1) ? 'sort_selected': ''}>
                              <span className="fa fa-sort-alpha-asc pr-5">
                                  Name: Acending
                              </span>
                          </a>
                      </li>
                      <li onClick= {()=> this.onClick('name',-1)}>
                          <a role="button" className= {(sort.by === 'name' && sort.value === -1) ? 'sort_selected': ''}>
                              <span className="fa fa-sort-alpha-desc pr-5">
                                  Name: Decending
                              </span>
                          </a>
                      </li>
                      <li role="separator" className="divider"></li>
                      <li onClick= {()=> this.onClick('status',1)}>
                          <a role="button"
                          className= {(sort.by === 'status' && sort.value ===1) ? 'sort_selected':''}
                          >Status: Finished</a>
                      </li>
                      <li onClick= {()=> this.onClick('status',-1)}>
                          <a role="button"
                          className= {(sort.by === 'status' && sort.value ===-1) ? 'sort_selected' :''}
                          >Status: Unfinish</a>
                      </li>
                  </ul>
              </div>
        </div>
 
    );
  }
}

export default Sort;
