import React, { useEffect, useState } from 'react';
import "./MyTrip.css";

function MyTrip() {
    const [myTrips, setMyTrips] = useState([]);

    //actualiza la constante myTrips
    useEffect(() => {
        getMyTrips();
    }, []);

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
    };
    const handleDelete = async (trip_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${trip_id}`,
                { method: 'DELETE' });
            if (response.ok) {
                getMyTrips();
                return;
            }
            console.log("Something went wrong");
        } catch (error) {
            console.log("Something went wrong");
        };
    };

    return (
        <div>
            <div>MyTrip</div>
            {myTrips.map((trip) => (
                <div key={trip.id}>
                    <li>{trip.name}</li>
                    <button className="" onClick={() => handleDelete(trip.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
};

export default MyTrip