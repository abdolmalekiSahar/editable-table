import React,{Component} from 'react';
import Table from "./_components/table";
import './App.css';

class App extends Component {
  
  render() {
    const columns = [
      {name: 'username', label: 'UserName', type: 'text',required: true},
      {name: 'firstname', label: 'FirstName', type: 'text',required: true},
      {name: 'lastname', label: 'LastName', type: 'text'},
      {name: 'sex', label: 'Sex', type: 'bool', true: 'Male', false: 'Female', initValue: false},
      {name: 'age', label: 'Age', type: 'number'},
      {name: 'status', label: 'Status', type: 'list', options: [
        {value: '0', label: 'Active'},
        {value: '1', label: 'Deactive'},
        {value: '2', label: 'Suspend'},
      ],required: true}
    ]
    return  <Table columns={columns}/>;
  }
}

export default App;
