import React, { Component } from 'react';
import './App.css';
import WorkForm from './components/WorkForm';
import SearchSort from './components/SearchSort';
import WorkList from './components/WorkList';
import { findIndex, filter} from 'lodash';
import demo from './trainning/demo'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [],
            displayForm: false,
            workEditing: null,
            filterName: '',
            filterStatus: -1,
            keyword: '',
            sortBy: '',
            sortValue: -1
        };

    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('works')){
            var works=JSON.parse(localStorage.getItem('works'));
            this.setState ({
                works: works
            });
        }
    }

    
    GenarateID = () => {
        var randomString = require('random-string');
        return randomString();
    }

    toggleForm = () => {
        if (this.state.displayForm===true && this.state.workEditing !== null) {
            this.setState ({
            displayForm : true,
            workEditing: null
            });
        } else {
            this.setState ({
            displayForm : !this.state.displayForm,
            workEditing: null
            });
        }

    }

    closeForm = () => {
        this.setState ({
            displayForm : false
        });
    }

    openForm = () => {
        this.setState ({
            displayForm : true
        });
    }

    addToState = (obj) => {
        var {works} = this.state;
        if (obj.id === '') {
            obj.id = this.GenarateID();
            works.push(obj);
        } else {
            var index = this.checkId(obj.id);
            works[index] = obj;
        }
        
        this.setState ({
            works : works
        });
        localStorage.setItem ('works', JSON.stringify(works));
    }

    onUpdateStatus = (id) => {
        var {works} = this.state;
        var index = this.checkId(id);
        if (index !== -1 ){
            works[index].status = !works[index].status;
            this.setState ({
                works : works
            });
            localStorage.setItem('works', JSON.stringify(works));
        }
        
    }

    checkId = (id) => {
        var {works} = this.state;
        var result = -1;
        works.forEach((work, index)=> {
            if(work.id === id) {
                result = index;
            } 
        });
        return result;
    }

    onDeleteWork = (id) => {
        var {works} = this.state;
        //var index = this.checkId(id);
        var index = findIndex(works, (work) => {
            return work.id === id;
        });
        if (index !== -1 ){
            works.splice(index,1);
            this.setState ({
                works : works
            });
            localStorage.setItem('works', JSON.stringify(works));
        }
        this.closeForm();
    }

    onUpdateWork=(id) => {
        var {works} = this.state;
        var index = this.checkId(id);
        var workEditing=works[index];
        this.setState({
            workEditing: workEditing
        });
        this.openForm();
    }

    onFilter =(filterName,filterStatus)=> {
        filterStatus = parseInt(filterStatus, 10);
        this.setState ({
            filterName:filterName.toLowerCase(),
            filterStatus:filterStatus
        });       
    }

    onSearch = (keyword) => {
        this.setState ({
            keyword:keyword
        });
    }

    onSort = (sortBy,sortValue) => {
        this.setState({
            sortBy:sortBy,
            sortValue:sortValue
        });
        console.log(this.state.sortBy, this.state.sortValue)
    }




  render() {

    var { works, displayForm, workEditing, filterName, filterStatus, keyword,sortValue, sortBy } = this.state;

    works = filter(works, (work) => {
        return work.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    

    if(filterName){
        
        works = works.filter((work) => {
            return work.name.toLowerCase().indexOf(filterName)!==-1;
        });
        console.log(works);
        
        // Immutable.map(works).filter((work) => {
        //     return work.name.toLowerCase().indexOf(filterName)!==-1;
        // });
    }
    works = works.filter((work)=>{
        if(filterStatus ===-1) {
            return work;
        } else {
            return work.status === (filterStatus === 1 ? true :false)
        }
    });

    // if (keyword) {
    //     works = works.filter ((work) => {
    //         return work.name.toLowerCase().indexOf(keyword) !== -1;
    //     });
    // }

    if (sortBy === 'name') {
        works.sort((a,b) => {
            if(a.name > b.name) return sortValue;
            else if (a.name <b.name) return -sortValue;
            else return 0;
        });
    } else {
        works.sort((a,b) => {
            if(a.name > b.name) return -sortValue;
            else if (a.name <b.name) return sortValue;
            else return 0;
        });
    }
    

    var elmForm = displayForm ? <WorkForm 
                                        closeForm = {this.closeForm} 
                                        addToState={this.addToState}
                                        workEditing = {workEditing}/> : '';
        
    return (

      <div className="container-fluid margin">

        <div className="text-center">
            <h1>Work Management Application</h1>
        </div>
        <hr/>

          <div className="row">

              <div className= { displayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4": ""}>
                    { elmForm }
              </div>

              <div className={ displayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

                  <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick= {this.toggleForm}
                  >
                  <span className="fa fa-plus mr-5"></span>
                  Add more work to do
                  </button>

                  <SearchSort 
                                onSearch = {this.onSearch}
                                onSort = {this.onSort}/>

                  <br/>

                  <WorkList 
                            works= {this.state.works} 
                            onUpdateStatus = {this.onUpdateStatus} 
                            onDeleteWork = {this.onDeleteWork}
                            onUpdateWork = {this.onUpdateWork}
                            onFilter = {this.onFilter}/>

              </div>
          </div>


      </div>
    );
  }
}

export default App;
