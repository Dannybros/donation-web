import React, {useState} from 'react'
import './nav.css'
import logo from '../../img/logo/logo3.png'
import SideBar from './SideBar/SideBar';
import {useNavigate, Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { useStateValue } from '../../Reducer/StateProvider';

function Nav() {

    const navigate = useNavigate();
    const [{language}, dispatch] = useStateValue();

    const {t, i18n} = useTranslation();
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    const toggleHandler=()=>{
       setIsToggleOpen(!isToggleOpen);
    }
    const backHandler=()=>{
       setIsToggleOpen(false);
    }
    const changeLang=(e)=>{
        const lng = e.target.value;
        dispatch({
            type:'Set_Lang',
            lang: lng,
        });
        localStorage.setItem('lang', lng);
        i18n.changeLanguage(lng)
    }

    const goToAboutUs=()=>{
        localStorage.setItem('about', 'OverView')
    }

    const lang = localStorage.getItem('lang');

    return (
        <div className="nav">
            <img src={logo} className="logoImg" alt="logo" onClick={()=>navigate('/')}/>
            <ul className="nav-list">
                <li>
                    <Link to="/" className="nav__li" activeClassName='active'>
                        {t('Home.nav.list1')}
                    </Link>
                </li>
                <li>
                    <Link to="/project" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list4')}
                    </Link>
                </li>
                <li>
                    <Link to="/news" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list3')}
                    </Link>
                </li>
                
                <li onClick={goToAboutUs}>
                    <Link to="/about-us" className="nav__li" activeClassName='activeLink'>
                        {t('Home.nav.list2')}
                    </Link>
                </li>
            </ul>
            <div className="LangSelector-box" key ={language}>
                <select className="LangSelector" value={lang? lang: "en"} onChange={changeLang}>
                    <option value="en" >English</option>
                    <option value="zh" >中文</option>
                    <option value="ko" >조선어</option>
                </select>
            </div>
            <button className="toggle-button" onClick={toggleHandler}>
                <div className="toggle-button-line"/>
                <div className="toggle-button-line"/>
                <div className="toggle-button-line"/>
            </button>
            <SideBar show={isToggleOpen}/>
            {isToggleOpen && <div className="backdrop" onClick={backHandler}/>}
        </div>
    )
}

export default Nav
