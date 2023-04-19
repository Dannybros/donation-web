import React from 'react'
import telegram from '../../img/telegram.jpg'
import wechat from '../../img/wechat.jpg'
import whatsapp from '../../img/whatsapp.jpg'
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
        <Modal.Body className='img_group'>
            <div className='img_box'>
                <p className='mb-0'>Telegram</p>
                <img src={telegram} className="QR_IMG" alt="qr"/>
            </div>
            <div className='img_box'>
                <p className='mb-0'>Whatsapp</p>
                <img src={wechat} className="QR_IMG" alt="qr"/>
            </div>
            <div className='img_box'>
                <p className='mb-0'>Wechat</p>
                <img src={whatsapp} className="QR_IMG" alt="qr"/>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default Donation