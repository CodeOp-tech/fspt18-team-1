import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom"
import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom"
import "./MyTrip.css";

function MyTrip() {
    const {trip_id} = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [isEditFormOpen,setIsEditFormOpen]= useState(false);
    
    //actualiza la constante myTrips
    useEffect(() => {
        getTrip();
    }, []);

    //llama a la base de datos y trae todos los viajes
    const getTrip = () => {
        fetch(`http://localhost:5000/api/trips/${trip_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data[0]);
                setEditingTrip(data[0]); // Asigna los detalles del viaje a editingTrip
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
    const {trip_id} = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [isEditFormOpen,setIsEditFormOpen]= useState(false);
    
    //actualiza la constante myTrips
    useEffect(() => {
        getTrip();
    }, []);

    //llama a la base de datos y trae todos los viajes
    const getTrip = () => {
        fetch(`http://localhost:5000/api/trips/${trip_id}`)
            .then((response) => response.json())
            .then((data) => {
                setTrip(data[0]);
                setEditingTrip(data[0]); // Asigna los detalles del viaje a editingTrip
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
                    <p className="flex mb-8"></p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sit culpa quibusdam harum eligendi nostrum, sunt omnis debitis asperiores. Harum nulla ex dolores, temporibus alias blanditiis quos obcaecati dignissimos fugit?.</p>
            <div className="p-4"></div>
                    <button className="" onClick={() => handleDelete(trip.id)}>Delete</button>

                    <button className="" onClick={handleEdit}>Edit</button>
                    <div className="p-4">
                    </div>
                </div>
        </div>
    )
};
};

export default MyTrip
export default MyTrip