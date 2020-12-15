import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import {Card} from 'react-bootstrap'

export default function Pagination(props) {
  // console.log(props.rdata)
  const data=props.rdata
  var col=[]
  // console.log(data)
  for (const [key] of Object.entries(data[0])){
    var temp={}
    temp["label"]=key
    temp["field"]=key
    col=col.concat(temp)
  }
  // console.log(col)
  const [datatable] = React.useState({
    columns:col,
    rows: data
  });

  return <Card>
  <Card.Body>
    <MDBDataTableV5 
    hover entriesOptions={[5, 20, 25]} 
    entries={5}  
    data={datatable} 
    scrollX 
    scrollY
    striped
    bordered
    pagingTop/>
  </Card.Body>
  </Card>;
}
// to do : beautify + start date end date