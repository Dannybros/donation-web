import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'

function ErrorPage() {

    const navigate = useNavigate();
    const [counter, setCounter] = useState(4);

    useEffect(() => {
        counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : navigate('/');
    }, [counter, navigate])

    return (
        <div>
            <Helmet>
                <title>Error Page 404</title>
            </Helmet>
            <h1>404, Page is not found!</h1>
            <h5>Will redirect to Home page <span style={{color:'blue', borderBottom:"1px solid blue"}}>{counter}</span> </h5>
        </div>
    )
}

export default ErrorPage
