import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import locationName from '../../fakeData/fakeLocations';
import transportDetails from '../../fakeData/fakeTransport';
import Direction from '../Map/Direction';

const Destination = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();


    const [isSearch, setIsSearch] = useState(false);

    const [result, setResult] = useState({});

    const { vehicle } = useParams();
    const [locations, setLocations] = useState(locationName);

    const [transports, setTransport] = useState(transportDetails);
    const { id, name, img, cost } = transports[vehicle - 1];

    const onSubmit = data => {

        setResult(data);
        setIsSearch(!isSearch);
    };

    const handleBackSearch = () => {
        setIsSearch(!isSearch);
        setResult({});
    }




    return (

        <div className="row container-fluid">
            <div className="col-md-3 bg-secondary text-white rounded">

                {
                    !isSearch ? <div>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-group">
                                <label>Pick From </label>
                                <select className="form-control" {...register("fromLocation")}>
                                    {
                                        locations.map(location => <option key={location.id} value={location.name}>{location.name}</option>)
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Pick To</label>
                                <select className="form-control" {...register("toLocation")}>
                                    {
                                        locations.map(location => <option key={location.id} value={location.name}>{location.name}</option>)
                                    }
                                </select>
                            </div>

                            <input className="btn btn-warning btn-block" type="submit" value="Search" />
                        </form>
                    </div>

                        :

                        <div>
                            <div className="bg-dark rounded text-center m-2">
                                <h3>{result.fromLocation} To</h3>
                                <h3>{result.toLocation}</h3>
                            </div>

                            <div className="d-flex justify-content-around bg-light text-dark p-2 rounded m-2">
                                <img className="rounded" src={img} height="45px" width="60px" alt="" />
                                <h4>{name}</h4>
                                <h4>4</h4>
                                <h4>$ {cost}</h4>
                            </div>

                            <div className="m-2">
                                <button className="btn btn-warning btn-block " onClick={handleBackSearch}>Back To Search</button>
                            </div>

                        </div>
                }

            </div>

            {/* map include */}
            <div className="col-md-9 rounded">
                <Direction direction={result}></Direction>
            </div>
        </div>
    );
};

export default Destination;