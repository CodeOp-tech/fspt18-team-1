import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import "./MyTrip.css";
import Map from "../components/Map";


function MyTrip() {
    const { trip_id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

    //actualiza la constante myTrips and Images
    useEffect(() => {
        getTrip();
    }, []);

    //llama a la base de datos y trae todos los viajes
    const getTrip = () => {
        fetch(`http://localhost:5000/api/trips/${trip_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data);
                // setEditingTrip(data); // Asigna los detalles del viaje a editing Trip
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
        <div className="flex flex-col items-center">
            <div key={trip.id}>
                <h1 className="pt-14 pb-20">{trip.name}</h1>
                <h1 className="pt-14 pb-20">{trip.user_id}</h1>
                <Map mapTrip={trip}/>
                <div className="">
                    {trip.imageName && <img src={`http://localhost:5000/images/${trip.imageName}`} id={trip.imageName} alt={trip.imageDescription} />}
                </div>
                <p className="flex mb-8"></p>
                <p>{trip.description}</p>
                <p>{trip.date}</p>
                <div className="p-4"></div>
                <button className="" onClick={() => handleDelete(trip.id)}>Delete</button>
                <button className="" onClick={handleEdit}>Edit</button>
                <div className="p-4">
                </div>
            </div>
        </div>
    )
};

export default MyTrip