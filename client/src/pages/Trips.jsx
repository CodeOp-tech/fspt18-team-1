import React, { useState, useEffect} from 'react';
import "./Trips.css";
import { Link } from 'react-router-dom'

function Trips() {
    const [trips, setTrips] = useState([]);
    const [emptyTripList, setEmptyTripList] = useState("");
    const [userTrips, setUserTrips] = useState([]);
    const [emptyUserTripList, setEmptyUserTripList] = useState("");

    //actualiza la constante myTrips
  
    useEffect(() => {
        getTrips();
        getUserTrips();
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
    const getUserTrips = () => {
        fetch(`http://localhost:5000/api/trips/userTrips`, {
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (!data.length) {
                    setEmptyUserTripList("Oops! Looks like there are no trips");
                } else {
                    setEmptyUserTripList("");
                }
                setUserTrips(data);
            })
            .catch((error) => {
                console.log("Oops! Something went wrong")
            });
    };

    return (
        <div className="trips">
            <h1 className="pt-14 pb-20">Trips</h1>
            <div className="p-4"></div>
            
                {emptyUserTripList && <p>{emptyUserTripList}</p>}
                <table className="table">
                {userTrips.map((userTrip) => (
                    <Link key={userTrip.id} to={`/trips/${userTrip.id}`}>
                        <li >{userTrip.name}</li>
                    </Link>
                ))}
                </table>
                {emptyTripList && <p>{emptyTripList}</p>}
                <table className="table">
                {trips.map((trip) => (
                    <Link key={trip.id} to={`/trips/${trip.id}`}>
                        <li >{trip.name}</li>
                    </Link>
                ))}
               </table>
        </div>
        

    );
};


export default Trips