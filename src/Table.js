import React, {Component} from 'react';
import ReactDOM from "react-dom";
import * as reactDom from "react-dom";
import {Form,Button,Spinner,Card,Row} from 'react-bootstrap';

import TextField from '@material-ui/core/TextField';


import Pagination from './datatable'; //datatable

// const url="http://127.0.0.1:5000/"
const url="https://xry7h6r9m2.execute-api.us-east-1.amazonaws.com/"

//equity code kick
const mapping={"dt_data_type":["table_name","field_type"],
"dt_equity":["equity_code","country_code","eco_sector_name"],
"dt_equity_de":["equity_code","datefrom","dateto"],
"dt_equity_pe1":["equity_code","datefrom","dateto"],
"dt_equity_pe2":["equity_code","datefrom","dateto"],
"dt_equity_pe3":["equity_code","datefrom","dateto"],
"dt_history":["country_code","entity"],
"dt_index":["index_code"],
"dt_index_de":["index_code","datefrom","dateto"],
"dt_index_member":["index_code"],
"dt_market":["country_code"],
}
const directInput=["equity_code","index_code"]
const dateInput=["datefrom","dateto"]
var formData=[]

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

class Select extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:props.nvalue,
      result:{},  //return value
      loading:false,
      tempArray:[],
      blocking: false, //block the fucking way
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.valueOnChange=this.valueOnChange.bind(this);
    this.dateOnChange=this.dateOnChange.bind(this);
  }
 
  async componentDidMount(){
    this.setState({value:this.props.nvalue,result:{},loading:true,formData:[]})
    var loop1=[],loop2=[],loop3=[],ddid=0 //reset
    formData=[] //reset
    for (var value in mapping[this.state.value]) {
      var column=mapping[this.state.value][value];
      var ddids=String(ddid)
      
      formData=formData.concat([{name:column,value:""}])
      if (directInput.includes(column)){ 
          loop1.push(
          <React.Fragment>
            <Form.Label>{column}</Form.Label>
            <Form.Control id={ddids} onChange={this.valueOnChange} placeholder={`Enter ${column}`} />
          </React.Fragment>
          )
      }
      else if(dateInput.includes(column)){
          loop3.push(
            <React.Fragment>
            <Form.Label>{column}</Form.Label>
            <TextField
              id={ddids}
              type="date"
              onChange={this.dateOnChange}
              fullWidth={true}
              margin="dense"
              required
            />
            </React.Fragment>
          )
      }
      else{
        await this.getList(this.state.value)
        var selectList=[<option></option>]
        for (const item in await this.state.tempArray[column]){
          selectList.push(<option>{this.state.tempArray[column][item]}</option>)
        }
        loop2.push(
          <React.Fragment>
            <Form.Label>{column}</Form.Label>
            <Form.Control id={ddids} onChange={this.valueOnChange} as="select">
              {selectList}
            </Form.Control>
          </React.Fragment>
      )}
      ddid++
    }
    this.l1=loop1
    this.l2=loop2
    this.l3=loop3
    this.whole=(
      <Card border>
        <Card.Body>
        <Card.Title >
          <Form.Text style={{ color: "#1C2331"}}>Current Selecting table : </Form.Text>
          <Form.Text style={{ color: "#0099CC"}} >{this.state.value}</Form.Text>
        </Card.Title>
        <Form onSubmit={this.handleSubmit} >
        <Form.Group>
        {this.l1}
        {this.l2}
        {this.l3}
        </Form.Group>
        <Form.Text className="text-muted">Leave empty to not use that criteria on searching</Form.Text>
        <Row className="mt-2">
        <Button  variant="primary" type="submit">Search</Button>
        </Row>
        </Form>
        </Card.Body>
      </Card>
      )

    this.setState({loading:false})
  }
  componentWillUnmount(){
    console.log('Regenerate')
  }

  async getList(table){
    const requestOptions={
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({"table":table})
    };
    await fetch(url+"ava_get/ava_get", requestOptions)
    .then(res => res.json())
    .then(data=>this.state.tempArray= JSON.parse(data["message"]))
    // .then(()=>console.log(tempArray))
    
  }

  async handleSubmit(event){
    event.preventDefault();
    ReactDOM.render(
      <Spinner animation="grow"/>,
      document.getElementById('tableArea')
    )
    const requestOptions={
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body:{"table":this.state.value}
    };
    for (const id in formData){
      if (formData[id]["value"]!==""){
        requestOptions["body"][formData[id]["name"]]=formData[id]["value"]
      }
    }
    requestOptions["body"]=JSON.stringify(requestOptions["body"])
    await fetch( url+"general_get/general_get", requestOptions)
    .then(res => res.json())
    // .then(data=> console.log(JSON.parse(data["message"])))
    .then( async data=>{
      var temp=await JSON.parse(data["message"])
      reactDom.unmountComponentAtNode(document.getElementById('tableArea'));
      ReactDOM.render(
        <Pagination rdata={temp} tablename={this.state.value}/>,
        document.getElementById('tableArea')
      )
    }
      )
  }

  valueOnChange(event){
    // console.log(formData,event)
    formData[event.target.id]["value"]=event.target.value
   
  }
  dateOnChange(event){
    console.log(formData,event)
    formData[event.target.id]["value"]=formatDate(event.target.valueAsDate)
  }

  render(){ 
    return (
      <div>
      {this.state.loading?<Spinner animation="grow"/>:this.whole}
      </div>
    )
  }
  
};
export default Select;