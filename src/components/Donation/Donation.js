import React from 'react'
import QR from '../../img/QR.jpg'
import { Modal} from 'react-bootstrap'
import './Donation.scss'

function Donation(props) {
  return (
    <Modal 
        show={props.state} 
        onHide={props.close} 
        animation={true} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title style={{textTransform:"uppercase"}}>
                Please Scan The QR Code To Contact Us
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='img_box'>
            <img src={QR} className="QR_IMG" alt="qr"/>
        </Modal.Body>
    </Modal>
  )
}

export default Donation