import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'

import "./styles.css";

function App() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let counter = setInterval(() => setTimer(timer => timer + 1), 5000);
        return () => {
            clearInterval(counter);
        };
    }, [])

    useEffect(() => {

        // setLoading(true)
          
        fetch('/api')
        .then(response => response.json())
        .then(response => {
            setData(response)
            setLoading(false)
        })
        .catch(err => console.error(err));

    }, [timer]);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0, 
        minimumFractionDigits: 0,
    })

    const now = data.raised/data.goal*100

    const progressInstance = (
        !loading ?
        <div>
            <ProgressBar style={{height:"40px"}}>
                <ProgressBar now={now} label="" animated key={1} />
                <ProgressBar variant={"customBar"} now={100-now} key={2} color="gray" />
            </ProgressBar>
            <div class={"progress-amounts"} style={{display:"flex", justifyContent:"space-between", marginTop:"-2.75em", paddingLeft:"8px", paddingRight:"8px"}}>
                <div><span class={"raised"} style={{fontSize:"xx-large"}}>{formatter.format(data.raised)}</span> <span class={"supporters"} style={{marginLeft:"60px"}}>{data.donors} supporters</span></div>
                <div><span class={"goal"} style={{fontSize:"xx-large"}}>{formatter.format(data.goal)}</span></div>
            </div>
            
        </div>
        : <div>Loading...</div>
    );

    return (
        <div style={{width:"85%", margin:"5% auto"}}>
            {progressInstance}
        </div>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement);
