import React, {useState, useEffect} from 'react'
import GridLoader from "react-spinners/GridLoader";
import Cases from "./CasesSection/Cases";
import News from './NewsSection/News'
import HeroBoot from './HeroSection/Hero';
import ScrollTop from './ScrollTop/ScrollTop'
import About from './AboutSection/About';
import axios from '../../axios/axios'
import { useStateValue } from "../../Reducer/StateProvider";
import {Helmet} from 'react-helmet-async';
import Footer from '../Footer/Footer';

function Home() {

    const [loading, setLoading] = useState(true);
    const [{news}, dispatch] = useStateValue();

    useEffect(() => {
    
        const fetchNewsData= async()=>{

        await axios.get('/news')
            .then((res)=>{
                dispatch({
                type:'Add_News',
                news: res.data,
                })
            })
            .catch(err=>console.log(err));

        setLoading(false)
        }

        fetchNewsData();

        return ()=>{
            setLoading(true)
        }
    }, [dispatch])

    if(loading){
        return(
            <div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center', zIndex:'100 !important'}}>
                <GridLoader loading={loading} color={'lightblue'} size={30} margin={3} />
            </div>
        )
    }

    return (
        <div className='home_page'>
            <Helmet>
                <title>Home - Dream and Love Foundation</title>
            </Helmet>
            <ScrollTop/>
            <HeroBoot/>
            <About/>
            <Cases/>
            <News news={news}/>
            <Footer/>
        </div>
    )
}

export default Home
