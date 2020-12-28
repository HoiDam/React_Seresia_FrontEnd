import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody,  MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
    constructor(props) {
    super(props);
    this.state={
        modal: false,
        trunData:props.trunData,
        fullData:props.fullData
    }
    
    }

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn size="sm" color="danger" onClick={this.toggle}>{this.state.trunData} [TRUNCATED]</MDBBtn>
      <MDBModal size="sm" isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalBody>
          {this.state.fullData}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default ModalPage;