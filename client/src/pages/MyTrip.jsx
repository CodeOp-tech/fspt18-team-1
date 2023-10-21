import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import "./MyTrip.css";
// import Map from "../components/Map";
import { AuthenticationContext } from '../components/AuthContext';


function MyTrip() {
    const { trip_id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isUserIdEqual, setIsUserIdEqual] = useState(false);
    //user from Authentication context
    const { user } = useContext(AuthenticationContext);
    // console.log("User Id del usuario Loggeado", user)
    // console.log("User Id equal trip.user.id", user)
    //actualiza la constante myTrips and Images
    useEffect(() => {
        getTrip();
        // Check if user.id is equal to trip.user_id
        if(user){
            setIsUserIdEqual(user.id === trip.user_id);
        }
    }, [user,trip]);

    //llama a la base de datos y trae todos los viajes
    const getTrip = () => {
        fetch(`http://localhost:5000/api/trips/${trip_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data);
                setEditingTrip(data); // Asigna los detalles del viaje a editing Trip
            })
            .catch((error) => {
                console.log("No trips available")
            });
    };

    const handleDelete = async () => {
        const id = trip_id;
        console.log("id", id)
        try {
            if (id) {
                const response = await fetch(`http://localhost:5000/api/trips/${id}`,
                    { method: 'DELETE' });
                if (response.ok) {
                    navigate(`/trips`);
                    return;
                }
            }
            console.log("Something went wrong");
        } catch (error) {
            console.log("Something went wrong");
        };
    };

    const handleEdit = () => {
        setIsEditFormOpen(true);
        // Navega a la página MyTripAdd y pasa el trip_id como parámetro para la edición
        navigate(`/mytripadd/${trip_id}`);
    };

    return (
        <div key={trip.id}>
            <h1 className="pt-14 pb-20">{trip.name}</h1>
            {/*<Map mapTrip={trip}/>*/}
            <div className="">
                {trip && <img src={`http://localhost:5000/images/${trip.imageName}`} id={trip.imageName} alt={trip.imageDescription} />}
            </div>
            <p className="trip-description">{trip.description}</p>
            <p className="trip-date"> {trip.date}</p>
            <div className="p-4"></div>
            {isUserIdEqual && <button className="" onClick={() => handleDelete(trip.id)}>Delete</button>}
            {isUserIdEqual && <button className="" onClick={handleEdit}>Edit</button>}
            <div className="p-4">
                <div className="main-content" style={{ marginBottom: '100px' }}></div>
            </div>
        </div>
    )
};

export default MyTrip