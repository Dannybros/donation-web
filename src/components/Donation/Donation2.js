import React, {useState} from 'react'
import './Donation2.scss'
import axios from '../../axios/axios'
import {Row, Col, Modal, Button} from 'react-bootstrap';
import {useTranslation } from 'react-i18next';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Donation2(props) {
    const [donorAmount, setDonorAmount] = useState(0);
    const [onlyNumAmount, setOnlyNumAmount] = useState("");
    const [clientId, setClientId] = useState(null);
    const [loadPayment, setLoadPayment] = useState(false)
   
    const {t, i18n} = useTranslation();

    const handleActive=(event)=>{
        event.preventDefault();
        setDonorAmount(event.target.id)
        setOnlyNumAmount("")
    }

    const handleCustomAmount=(evt)=>{
        const financialGoal = (evt.target.validity.valid) ? evt.target.value : onlyNumAmount;
        setOnlyNumAmount(financialGoal)
        setDonorAmount(financialGoal)
    }

    const getClientID=async()=>{
        console.log(donorAmount);

        if(donorAmount<0){
            alert("No Donation Amount selected");
            setLoadPayment(false);
        }else{
            await axios.get('/paypal/clientID')
            .then(res=>{
                setClientId(res.data.clientId);
                setLoadPayment(true);
            })
            .catch(e=>console.log(e.error));
        }
    }

    const handleModalClose=()=>{
        props.close();
        setLoadPayment(false);
    }

    return (
        <Modal
            show={props.state} 
            onHide={handleModalClose} 
            animation={false} 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            className="donation_box2"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('Donation.donatePage.title')}
                    {props.name? ` to ${props.name[i18n.language]}`: ""}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='img_box'>
                {!loadPayment?
                <>
                    <Row className="donation_amount">
                        <Col lg={4} xs={6}  className="donationList">
                            <button className={donorAmount==='35'? "custom_donation active" : "custom_donation" } id="35" onClick={handleActive}>
                                35 $
                                <br/>
                                Dollars
                            </button>
                        </Col>
                        <Col lg={4} xs={6} className="donationList">
                            <button className={donorAmount==='75'? "custom_donation active" : "custom_donation" } id="75" onClick={handleActive}>
                                75 $
                                <br/>
                                Dollars
                            </button>
                        </Col>
                        <Col lg={4} xs={6}  className="donationList">
                            <button className={donorAmount==='125'? "custom_donation active" : "custom_donation" } id="125" onClick={handleActive}>
                                125 $
                                <br/>
                                (USD)
                            </button>
                        </Col>
                        <Col lg={4} xs={6}  className="donationList">
                            <button className={donorAmount==='250'? "custom_donation active" : "custom_donation" } id="250" onClick={handleActive}>
                                250 $
                                <br/>
                                (USD)
                            </button>
                        </Col>
                        <Col lg={8} xs={12}  className="donationList">
                            <input type="text" pattern="[0-9]*" value={onlyNumAmount} className="other_Amount" onInput={handleCustomAmount} onFocus={()=>setDonorAmount(0)} placeholder={t('Donation.form.info.otherAmount')}/>
                        </Col>
                    </Row>
                    <Button onClick={getClientID} className='donateConfirm'>
                        {t('Donation.donatePage.donateNow')}
                    </Button>
                </>
                :
                <div className='p-4'>
                    <PayPalScriptProvider options={{ "client-id": clientId}}>
                        <PayPalButtons
                            style={{
                                layout: 'vertical',
                                color: 'blue',
                                shape: 'pill',
                                label: 'paypal'
                            }} 
                            createOrder = {(data, actions)=> {
                                return actions.order.create({
                                    intent:"CAPTURE",
                                    purchase_units: [{
                                        amount: {
                                            value: donorAmount 
                                        }
                                    }]
                                });
                            }}
                            onApprove ={async(data, actions)=>{
                                const order = await actions.order.capture();
                                console.log('Capture result', order, JSON.stringify(order, null, 2));
                            }}
                            onError ={ (err)=>{
                                alert("Payment has failed. Please try again")
                                console.log(err);
                            }}
                        />
                    </PayPalScriptProvider>
                </div>   
                }
            </Modal.Body>
        </Modal>
    )
}

export default Donation2
