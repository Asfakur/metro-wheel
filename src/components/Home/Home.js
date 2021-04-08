import React, { useState } from 'react';
import { useHistory } from 'react-router';
import transportDetails from '../../fakeData/fakeTransport';
import Transport from '../Transport/Transport';

const Home = () => {

    // const transport = transportDetails;
    const [transports, setTransport] = useState(transportDetails);
    const history = useHistory()

    const bookTickets = (event) => {
        
        // event.preventDefault();
        console.log(event,'clicked');
        history.push(`/destination/${event}`);

    }

    return (
        <div style={{backgroundImage: `url("https://images.unsplash.com/photo-1595698612005-09bb2f1197e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80")`, backgroundRepeat: 'repeat-y', backgroundSize: 'cover', height: '650px'}}>
            <div className="container-fluid">
                <div className="row d-flex justify-content-around p-5"> 
                        {
                            transports.map(transport => 
                            <Transport bookTickets={bookTickets} transport={transport} key={transport.id}></Transport>
                            )
                        }

                </div>
            </div>
        </div>
    );
};

export default Home;