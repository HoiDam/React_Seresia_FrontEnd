import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar,DropdownButton,Dropdown,Form} from 'react-bootstrap'
import createClass from 'create-react-class';
import * as reactDom from "react-dom";

// import Pagination from './datatable';
import Select from './Table';

import 'bootstrap/dist/css/bootstrap.css';


var TableSelect = createClass({
  handleSelect: function(value){
    reactDom.unmountComponentAtNode(document.getElementById('selectArea'));
    
    ReactDOM.render(
    <Select nvalue={value} />,
    document.getElementById('selectArea')
  );
  },

  render: function(){
     return(
        <Navbar bg="light" expand="lg" className="bg-light justify-content-between">
        <Navbar.Brand style={{ color: "#9933CC"}}> 🗠 Seresia Datatable UI</Navbar.Brand>
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
        <Form.Text className="text-muted">created with reactJS⚛️</Form.Text>
        </Navbar>
        
     );
  }
});

// initial
ReactDOM.render(
  <TableSelect/>,
  document.getElementById('topArea')
)

