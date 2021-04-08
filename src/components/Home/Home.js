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
        <div>
            <div className="container-fluid">
                <div className="row bg-info d-flex justify-content-around"> 
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