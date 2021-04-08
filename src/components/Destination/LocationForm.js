import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import locationName from '../../fakeData/fakeLocations';

const LocationForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [locations, setLocations] = useState(locationName);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
                <label>Pick From</label>
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

            <input className="btn btn-success" type="submit" value="Search" />
        </form>

    );
};

export default LocationForm;