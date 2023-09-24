import React, { useState, useEffect } from 'react';
import "./Trips.css";

function Trips() {

    const [Trips, setTrips] = useState([]);

    //actualiza la constante myTrips
    useEffect(() => {
        getTrips();
    },[]);

    //llama a la base de datos y trae todos los viajes
    const getTrips = () => {
        fetch('http://localhost:5000/api/trips/')
            .then((response) => response.json())
            .then((data) => {
                setTrips(data);
            })
            .catch((error) => {
                console.log("Oops! Something went wrong")
            });
    }

    return (
        <div>
            <div>Trips</div>
            {Trips.map((trip) => (
                <li key={trip.id}>{trip.name}</li>
            ))}
        </div>
    )
}

export default Trips