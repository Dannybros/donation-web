import React, {useState, useEffect} from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import './locales/i18n';
import { Nav, Post, AboutUs, BrowseNews, NewsList, NewsDetail, DonationPage, Home} from './components/Import.js'
import ErrorPage from './components/ErrorPage'
import {HelmetProvider } from 'react-helmet-async';
import { useStateValue } from "./Reducer/StateProvider";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [{language}] = useStateValue();
  
  const [font, setFont] = useState();

  useEffect(() => {
    switch (language) {
      case "en":
        setFont("Times New Roman");
        break;
      case "ko":
        setFont("BatangChe");
        break;
      case "zh":
        setFont("SimHei");
        break;
      default:
        setFont(null);
    }
  }, [language])
  
  return (
    <HelmetProvider>
      <div className="position-relative" style={{fontFamily:font}}>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/news">
            <Route index element={<BrowseNews />} />
            <Route path=":id" element={<NewsDetail />} />
            <Route path="list/:param" element={<NewsList/>} />
          </Route>
          <Route path="/project">
            <Route index element={<DonationPage />} />
            <Route path=":id*" element={<Post />} />
          </Route>
          <Route path="/about-us" element={<AboutUs/>} />  
          <Route path="/news/*" element={<Navigate to="/404" />} />
          <Route path="/project/*" element={<Navigate to="/404" />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
