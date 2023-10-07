import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom"
import "./MyTrip.css";

function MyTrip() {
    const {trip_id} = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [isEditFormOpen,setIsEditFormOpen]= useState(false);
    const [image, setImage]= useState(null);
    
    //actualiza la constante myTrips and Images
    useEffect(() => {
        getTrip();
        getImage();
    }, []);

    //llama a la base de datos y trae todos los viajes
    const getTrip = () => {
        fetch(`http://localhost:5000/api/trips/${trip_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data[0]);
                setEditingTrip(data[0]); // Asigna los detalles del viaje a editing Trip
            })
            .catch((error) => {
                console.log("No trips available")
            });
    };

    //llama a la base de datos y trae el iamgen del trip
    const getImage = () =>{
        fetch(`http://localhost:5000/api/trips/images/${trip_id}`)
        .then((response) => response.json())
        .then((data)=>{
            setImage(data[0]);
        })
        .catch((error) => {
            console.log("Oops! Something went wrong")
        });
    }

    const handleDelete = async (trip_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${trip_id}`,
                { method: 'DELETE' });
            if (response.ok) {
                navigate(`/trips`);
                return;
            }
            console.log("Something went wrong");
        } catch (error) {
            console.log("Something went wrong");
        };
    };

    const handleEdit = (id) => {
        setIsEditFormOpen(true);
        // Navega a la página MyTripAdd y pasa el trip_id como parámetro para la edición
        navigate(`/mytripadd/${trip_id}`);
    };

    return (
        <div className="flex flex-col items-center">
                <div key={trip.id}>
                <h1 className="pt-14 pb-20">{trip.name}</h1>
                <div className="">
                {image && <img src = {`http://localhost:5000/images/${image.name}`} id={image.id} alt={image.description}/>}
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