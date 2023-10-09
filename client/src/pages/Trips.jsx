import React, { useState, useEffect } from 'react';
import "./Trips.css";
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthenticationContext } from '../components/AuthContext';

function Trips() {

    const [trips, setTrips] = useState([]);
    const [emptyTripList, setEmptyTripList] = useState("");

    const { user } = useContext(AuthenticationContext);
    //actualiza la constante myTrips
    useEffect(() => {
        getTrips();
    }, []);

    //llama a la base de datos y trae todos los viajes
    const getTrips = () => {
        fetch('http://localhost:5000/api/trips/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (!data.length) {
                setEmptyTripList("Oops! Looks like there are no trips");
            } else {
                setEmptyTripList("");
            }
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
            {emptyTripList && <p>{emptyTripList}</p>}
                {trips.map((trip) => (
                    <Link key={trip.id} to={`/trips/${trip.id}`}>
                        <li >{trip.name}</li>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Trips