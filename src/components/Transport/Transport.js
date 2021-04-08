import React from 'react';

const Transport = (props) => {
    const { id, name, img, cost } = props.transport;
    return (

        <div onClick={() => props.bookTickets(id)} className="col-lg-2 col-md-4 rounded bg-light text-center m-2">
            <div>
                <img src={img} height="250px" width="200px" alt="" />
            </div>

            <div>
                <h3>{name}</h3>
            </div>
        </div>
    );
};

export default Transport;