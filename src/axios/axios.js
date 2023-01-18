import axios from 'axios'

const instance = axios.create({
    baseURL:'https://donation-server.vercel.app',   //http://localhost:8000  //https://donationbackendweb.herokuapp.com
})

export default instance