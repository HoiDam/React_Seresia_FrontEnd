import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar,DropdownButton,Dropdown,Form} from 'react-bootstrap'
import createClass from 'create-react-class';
import {unmountComponentAtNode} from "react-dom";


import Select from './Table';
import Pagination from './datatable';

import 'bootstrap/dist/css/bootstrap.min.css';


var TableSelect = createClass({
  handleSelect: function(value){
    unmountComponentAtNode(document.getElementById('selectArea'));
    // console.log(value);
    // test button

    ReactDOM.render(
    <Select nvalue={value} />,
    document.getElementById('selectArea')
  );
  },

  render: function(){
     return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand > 🗠 Seresia Datatable UI</Navbar.Brand>
        <Form.Text className="text-muted">created with reactJS</Form.Text>
        <DropdownButton title="Choose Table" id="bg-nested-dropdown" onSelect={this.handleSelect} value={this.eventKey}>
        <Dropdown.Item eventKey="dt_data_type">Data Type</Dropdown.Item>
        <Dropdown.Item eventKey="dt_market">Market</Dropdown.Item>
        <Dropdown.Item eventKey="dt_history">History</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="dt_equity">Equity</Dropdown.Item>
        <Dropdown.Item eventKey="dt_equity_de">Equity Detail</Dropdown.Item>
        <Dropdown.Item eventKey="dt_equity_pe1">Equity Period End Set A</Dropdown.Item>
        <Dropdown.Item eventKey="dt_equity_pe2">Equity Period End Set B</Dropdown.Item>
        <Dropdown.Item eventKey="dt_equity_pe3">Equity Period End Set C</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="dt_index">Index</Dropdown.Item>
        <Dropdown.Item eventKey="dt_index_de">Index Detail</Dropdown.Item>
        <Dropdown.Item eventKey="dt_index_member">Index Member</Dropdown.Item>
        </DropdownButton>
        </Navbar>
     );
  }
});

// initial
ReactDOM.render(
  <TableSelect/>,
  document.getElementById('topArea')
)


// test pagination
ReactDOM.render(
  <Pagination/>,
  document.getElementById('tableArea')
);
