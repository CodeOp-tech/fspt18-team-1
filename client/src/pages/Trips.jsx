import React, { useState, useEffect } from 'react';
import "./Trips.css";
import { Link } from 'react-router-dom'

function Trips() {

    const [Trips, setTrips] = useState([]);

    //actualiza la constante myTrips
    useEffect(() => {
        getTrips();
    }, []);

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
                <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <li >{trip.name}</li>
                </Link>
            ))}

        </div>
    )
}

export default Trips