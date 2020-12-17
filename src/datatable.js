import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import {Card} from 'react-bootstrap'
import {CSVLink, CSVDownload} from 'react-csv';

const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['John', 'Doe' , 'john.doe@xyz.com'] ,
  ['Jane', 'Doe' , 'jane.doe@xyz.com']
];



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

    <CSVLink data={csvData} 
    filename={"my-file.csv"}
    className="btn btn-primary"
    target="_blank">Download me
    </CSVLink>
    
  </Card.Body>
  </Card>;
}
// TO DO : csv+excel + tut +upload