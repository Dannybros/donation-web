import React from 'react'
import './Footer.scss'
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../img/logo/Relogo2.png'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../Reducer/StateProvider';

//icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {

    const navigate = useNavigate();

    const [{news}] = useStateValue();

    const {t, i18n} = useTranslation();

    const twoNews = news.slice(0, 2)

    const NewsLi=({item})=>{
        return(
            <li key={item._id} onClick={()=>navigate(`/news/${item._id}`)}>
                <img src={item.img[0]} alt=""/>
                <div>
                    <p className='px-3'> {item.title[i18n.language]}</p>
                    <span>{item.date.split('T')[0]}</span>
                </div>
            </li>
        )
    }
    
    return (
        <div className="footer" id="section__contact">
            <Container fluid>
               <Row>
                    <Col lg={6} sm={12} style={{marginBottom:'12px', borderBottom:'1px solid white'}}>
                        <section className="section_left">
                            <img src={logo} alt=""/>
                            <p>
                                {t('Footer.companyHeading')}
                            </p>
                            <div className="social_Icon">
                            <FacebookIcon/>
                            <InstagramIcon/>
                            <TwitterIcon/>
                            <YouTubeIcon/>
                            </div>
                        </section>
                    </Col>
                    <Col lg={6} sm={12} style={{marginBottom:'12px', borderBottom:'1px solid white'}}>
                        <section className="section_right">
                            <p>{t('Footer.TopNews.title')}</p>
                            <ul>
                                {twoNews.map((item)=>(<NewsLi item={item} key={item._id}/>))}
                            </ul>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
