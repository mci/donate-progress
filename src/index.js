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

        setLoading(true)
          
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
    })

    const now = data.raised/data.goal*100

    const progressInstance = (
        !loading ?
        <div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div><span style={{fontSize:"xx-large"}}>{formatter.format(data.raised)}</span> {data.donors} supporters</div>
                <div><span style={{fontSize:"xx-large"}}>{formatter.format(data.goal)}</span></div>
            </div>
            <ProgressBar>
                <ProgressBar now={now} label={`${now.toFixed(1)}%`} animated key={1} />
                <ProgressBar variant={"customBar"} now={100-now} key={2} color="gray" />
            </ProgressBar>
        </div>
        : <div>Loading...</div>
    );

    return (
        <div style={{width:"75%", margin:"5% auto"}}>
            {progressInstance}
        </div>
    )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement);
