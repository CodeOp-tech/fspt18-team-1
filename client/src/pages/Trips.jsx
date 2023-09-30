import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import "./Trips.css";
import { Link } from 'react-router-dom'
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
        <div className="flex flex-col items-center">
            <h1 className="pt-14 pb-20">Trips</h1>
            <div className="p-4"></div>
            <div className="grid grid-cols-4 gap-6">
            {Trips.map((trip) => (
                <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <li >{trip.name}</li>
                </Link>

            ))}
             </div>
        </div>
    )
}

export default Trips