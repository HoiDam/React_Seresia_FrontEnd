import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Form,Button,Spinner,Card} from 'react-bootstrap'

import Pagination from './datatable';

const url="http://127.0.0.1:5000/"

//equity code kick
const mapping={"dt_data_type":["table_name","field_type"],
"dt_equity":["equity_code","country_code","eco_sector_name"],
"dt_equity_de":["equity_code"],
"dt_equity_pe1":["equity_code"],
"dt_equity_pe2":["equity_code"],
"dt_equity_pe3":["equity_code"],
"dt_history":["country_code","entity"],
"dt_index":["index_code"],
"dt_index_de":["index_code"],
"dt_index_member":["index_code"],
"dt_market":["country_code"],
}
const directInput=["equity_code","index_code"]

var formData=[]

class Select extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:props.nvalue,
      result:{},  //return value
      loading:false,
      tempArray:[]
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.valueOnChange=this.valueOnChange.bind(this);
  }
  async componentDidMount(){
    this.setState({value:this.props.nvalue,result:{},loading:true,formData:[]})
    var loop1=[],loop2=[],ddid=0 //reset
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
    this.whole=(
      <Card>
        <Card.Body>
        <Card.Title>Current Selecting table : {this.state.value}</Card.Title>
        <Form  onSubmit={this.handleSubmit} >
        <Form.Group>
        {this.l1}
        {this.l2}
        </Form.Group>
        <Button  variant="primary" class="mt-2" type="submit">Search</Button>
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
    console.log(requestOptions["body"])
    await fetch( url+"general_get/general_get", requestOptions)
    .then(res => res.json())
    // .then(data=> console.log(JSON.parse(data["message"])))
    .then( async data=>{
      var temp=await JSON.parse(data["message"])
      ReactDOM.render(
        <Pagination rdata={temp} />,
        document.getElementById('tableArea')
      )
    }
      )
  }

  valueOnChange(event){
    formData[event.target.id]["value"]=event.target.value
    // console.log(formData)
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