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
        <div className="trips">
            <h1 className="pt-14 pb-20">Trips</h1>
            <table className="table">
                    {Trips.map((trip) => ( 
                       
                        <Link className="link" key={trip.id} to={`/trips/${trip.id}`}>
                            <trip >{trip.name}</trip>
                        </Link>
                    
                    ))}
            </table>
        </div>
        

    );
};


export default Trips