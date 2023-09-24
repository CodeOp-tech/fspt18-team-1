import React, { useEffect, useState } from 'react';
import "./MyTrip.css";

function MyTrip() {
    const [myTrips, setMyTrips] = useState([]);

    //actualiza la constante myTrips
    useEffect(() => {
        getMyTrips();
    },[]);

    //llama a la base de datos y trae todos los viajes
    const getMyTrips = () => {
        fetch('http://localhost:5000/api/trips/')
            .then((response) => response.json())
            .then((data) => {
                setMyTrips(data);
            })
            .catch((error) => {
                console.log("Oops! Something went wrong")
            });
    }

    return (
        <div>
            <div>MyTrip</div>
            {myTrips.map((trip) => (
                <li key={trip.id}>{trip.name}</li>
            ))}
        </div>
    )
};

export default MyTrip