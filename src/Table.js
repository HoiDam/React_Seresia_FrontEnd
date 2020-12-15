import React, { Component } from 'react';
import {Form,Button,Spinner} from 'react-bootstrap'

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
var tempArray
var formData=[]
async function getList(table){
  
  const requestOptions={
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({"table":table})
  };
  await fetch(url+"ava_get/ava_get", requestOptions)
  .then(res => res.json())
  .then(data=>tempArray= JSON.parse(data["message"]))
  // .then(()=>console.log(tempArray))
  
}



class Select extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:props.nvalue,
      result:{},  //return value
      loading:false,
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.valueOnChange=this.valueOnChange.bind(this);
  }
  async componentWillMount(){
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
        await getList(this.state.value)
        var selectList=[<option></option>]
        for (const item in await tempArray[column]){
          selectList.push(<option>{tempArray[column][item]}</option>)
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
    this.setState({loading:false})
  }
  async handleSubmit(event){
    event.preventDefault();
    const requestOptions={
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({"table":this.state.value})
    };
    return fetch( "http://127.0.0.1:5000/general_get/general_get", requestOptions)
    .then(res => res.json())
    .then(data=>this.setState({formData:String(data["message"])}))
    
  }
  valueOnChange(event){
    // this.setState({formData[event.target.id]:event.target.value;})
    // console.log(this.state.formData,event.target.value,event.target.id)
    formData[event.target.id]["value"]=event.target.value

  }
  

  render(){ 

    return (
      <div>
      <Form  onSubmit={this.handleSubmit} >
      <Form.Group>
      {this.l1}
      {this.state.loading?<Spinner animation="grow"/>:this.l2}
      </Form.Group>
      <Button  variant="primary" class="mt-2" type="submit">Search</Button>
      </Form>
      </div>
    )
  }
  


};
export default Select;