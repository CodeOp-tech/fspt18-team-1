import React, { useState, useEffect} from 'react';
import "./Trips.css";
import { Link } from 'react-router-dom'
import { FaCircle } from 'react-icons/fa';

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
    <div className="page-container">
        <div className="trips">
            <h1>My Trips</h1>
                {emptyUserTripList && <p>{emptyUserTripList}</p>}
                {userTrips.map((userTrip) => (
                    <Link key={userTrip.id} to={`/trips/${userTrip.id}`}>
                        <li className='trips'>{userTrip.name}</li>
                        <div className="iconsimg">
                        <img src={`http://localhost:5000/images/${userTrip.imageName}`} id={userTrip.imageName} alt={userTrip.imageDescription} 
                        className="image-resize1" 
                        />
                        </div>
                    </Link>  
                ))}
                

            <h4>Trips</h4>
                {emptyTripList && <p>{emptyTripList}</p>}
                {trips.map((trip) => (
                    <Link key={trip.id} to={`/trips/${trip.id}`}>
                    <li className='trips'>{trip.name}</li>
                        <div className="iconsimg">

                        <img src={`http://localhost:5000/images/${trip.imageName}`} id={trip.imageName} alt={trip.imageDescription} 
                        className="image-resize" 
                        />
                        </div>
                    </Link> 

                ))}
        </div>
    </div>

    );
};


export default Trips