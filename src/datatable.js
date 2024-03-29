import React from 'react';
import { MDBDataTableV5} from 'mdbreact';
import {Card,Button,Tab,Tabs,Row} from 'react-bootstrap'
import {CSVLink} from 'react-csv';

import ReactExport from "react-data-export"; //excel
import ModalPage from './modalPage'; //modal

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const stringMax=20;


class ExcelDl extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      col:props.col,
      rows:props.rows,
      filename:props.filename
    }
    var loop=[]
    for (const i in this.state.col){
      // console.log(this.state,this.state.col[i])
      loop.push( <ExcelColumn label={this.state.col[i]["label"]} value={this.state.col[i]["field"]}/>)
    }
    this.excelCol=loop
  }
  render(){
    return (
    <ExcelFile filename={this.state.filename} element={<Button variant="primary">Download</Button>}>
    <ExcelSheet data={this.state.rows} name="Sheet 1">
    {this.excelCol}
    </ExcelSheet>
    </ExcelFile>
    )
  }
  
}



export default function Pagination(props) {
  // console.log(props.rdata)
  const data=props.rdata
  const name=props.tablename
  var genData=[]
  var col=[]
  var obj=[]
  // console.log(data)
  for (const [key] of Object.entries(data[0])){
    var temp={}
    temp["label"]=key
    temp["field"]=key
    col=col.concat(temp)
  }
  for (const i in data){
    obj ={}
    for (const [key,value] of Object.entries(data[i])){
      // console.log(key,value)
      if (typeof(value)!="string"){
        obj[key]=value
        continue
      }
      if (value.length>=stringMax){
        var tempD=value.substring(0,stringMax)
        obj[key]=<ModalPage trunData={tempD} fullData={value} />

      }
      else{
        obj[key]=value
      }
    }
    // console.log(obj)
    genData=genData.concat(obj)
  }
  console.log(data,genData)
  const [datatable] = React.useState({
    columns:col,
    rows: genData
  });

  
  return <Card border>
  <Card.Body>
    <Card.Title>Fetched Result : </Card.Title>
    <MDBDataTableV5 
    entries={5}
    responsive
    hover 
    striped
    pagingTop
    data={datatable} />

  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
    <Tab eventKey="csv" title="CSV">
      <Row className="mt-4"></Row>
      <CSVLink data={data} 
        filename={`${name}.csv`}
        className="btn btn-primary"
        target="_blank">Download
        </CSVLink>
      
    </Tab>
    <Tab eventKey="excel" title="Excel">
      <Row className="mt-4"></Row>
      <ExcelDl col={col} rows={data} filename={name} />
    </Tab>
    
  </Tabs>  
  </Card.Body>
  </Card>;
}
//  truncate +upload