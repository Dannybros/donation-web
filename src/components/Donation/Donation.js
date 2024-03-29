import React from 'react'
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import visa from '../../img/visa.png'
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
                Donation
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center flex-column align-items-center'>
            <p className='mb-1 fw-bold fs-4'>QR CODE</p>
            <div className='img_box card px-3'>
                <img src={visa} className="QR_IMG" alt="qr"/>
            </div>

            <div className='mt-4 fw-bold d-flex align-items-center'>
                <span className='me-2'>To Contact us:</span>
                <div className="d-flex">
                    <a href="https://mui.com/material-ui/material-icons/?query=telegram" target="_blank" rel="noreferrer" className='contact-icons'>
                        <TelegramIcon/>
                    </a>
                    <a href="https://mui.com/material-ui/material-icons/" target="_blank" rel="noreferrer" className='contact-icons'>
                        <WhatsAppIcon className='bg-secondary-subtle'/>
                    </a>
                    <a href="https://mui.com/material-ui/material-icons/" target="_blank" rel="noreferrer" className='contact-icons'>
                        <span>
                            <svg fill="currentColor" width="25" height="25" viewBox="0 0 64 64"><path d="M56.4992 51.5C60.3992 48.7 62.9992 44.5 62.9992 39.7C62.9992 31.1 54.6992 24 44.2992 24C33.8992 24 25.6992 31 25.6992 39.6C25.6992 48.2 33.9992 55.2 44.2992 55.2C46.3992 55.2 48.4992 54.9 50.3992 54.4C50.4992 54.3 50.6992 54.3 50.9992 54.3C51.2992 54.3 51.6992 54.4 51.9992 54.6L56.0992 57C56.1992 57.1 56.1992 57.1 56.3992 57.1C56.6992 57.1 56.9992 56.8 56.9992 56.5C56.9992 56.4 56.8992 56.2 56.8992 56.1C56.8992 56 56.2992 54.1 56.1992 52.9C56.1992 52.8 56.1992 52.6 56.1992 52.5C55.9992 52.1 56.1992 51.7 56.4992 51.5ZM38.0992 37.3C36.6992 37.3 35.5992 36.2 35.5992 34.8C35.5992 33.4 36.6992 32.3 38.0992 32.3C39.4992 32.3 40.5992 33.4 40.5992 34.8C40.5992 36.2 39.4992 37.3 38.0992 37.3ZM50.4992 37.3C49.0992 37.3 47.9992 36.2 47.9992 34.8C47.9992 33.4 49.0992 32.3 50.4992 32.3C51.8992 32.3 52.9992 33.4 52.9992 34.8C52.9992 36.2 51.9992 37.3 50.4992 37.3Z"/><path d="M44.3 22.8C44.7 22.8 45 22.8 45.6 22.8C43.8 13.9 34.5 7 23.4 7C11.1 7.1 1 15.4 1 25.7C1 31.5 4 36.4 8.8 39.8C9.2 40.1 9.4 40.5 9.4 41.1C9.4 41.2 9.3 41.4 9.3 41.5C8.9 42.9 8.3 45.2 8.3 45.3C8 45.5 8 45.6 8 45.9C8 46.3 8.3 46.6 8.8 46.6C8.9 46.6 9.1 46.5 9.2 46.5L14.1 43.7C14.4 43.6 14.9 43.4 15.4 43.4C15.5 43.4 15.8 43.5 16.1 43.5C18.4 44.2 20.9 44.5 23.4 44.5C23.8 44.5 24.1 44.5 24.7 44.5C24.3 43.1 24 41.5 24 40C24 30.2 33 22.8 44.3 22.8ZM30.9 16.7C32.6 16.7 33.9 18.1 33.9 19.7C33.9 21.3 32.5 22.7 30.9 22.7C29.3 22.7 27.9 21.3 27.9 19.7C27.9 18.1 29.2 16.7 30.9 16.7ZM15.9 22.8C14.2 22.8 12.9 21.4 12.9 19.8C12.9 18.2 14.3 16.8 15.9 16.8C17.5 16.8 18.9 18.2 18.9 19.8C18.9 21.4 17.6 22.8 15.9 22.8Z"/></svg>
                        </span>
                    </a>
                </div>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default Donation