import React, { useEffect, useState } from 'react';
import "./MyTrip.css";
import { useNavigate } from 'react-router-dom'; //para navegar a la pagina de add y editar el fomulario
import MyTripAdd from './MyTripAdd'; // Importa tu página MyTripAdd para editar el viaje

function MyTrip() {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [editingTrip, setEditingTrip] = useState(null);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);

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
    };
    const handleDelete = async (trip_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${trip_id}`,
                { method: 'DELETE' });
            if (response.ok) {
                getTrips();
                return;
            }
            console.log("Something went wrong");
        } catch (error) {
            console.log("Something went wrong");
        };
    };

    const handleEdit = (id) => {
        const editMyTrip = trips.find((trip) => trip.id === id);
        setEditingTrip(editMyTrip);
        setIsEditFormOpen(true);
    };

    const handleEditSave = async (editedTrip) => {
        const id = editedTrip.id;
        // Implementación de la lógica para guardar los cambios en la base de datos
        try {
            const response = await fetch(`http://localhost:5000/api/trips/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTrip),
            });

            if (response.ok) {
                console.log('Trip updated successfully');
                // Después de guardar los cambios, navega de vuelta a la lista de viajes
                setIsEditFormOpen(false); // Cierra el formulario de edición
                // Realiza la navegación a la lista de viajes después de guardar
                navigate('/trips');
                return true; // Indicar que la actualización fue exitosa
            } else {
                console.error('Error updating trip');
                return false; // Indicar que hubo un error en la actualización
            }
        } catch (error) {
            console.error('Error updating trip:', error);
            return false; // Indicar que hubo un error en la actualización
        }

    };

    const handleEditCancel = () => {
        setIsEditFormOpen(false); // Cierra el formulario de edición
        // Realiza la navegación a la lista de viajes sin guardar cambios
        navigate('/trips');
    };

    return (
        <div>
            <div>MyTrip</div>
            {trips.map((trip) => (
                <div key={trip.id}>
                    <li>{trip.name}</li>
                    <button className="" onClick={() => handleDelete(trip.id)}>Delete</button>
                    <button className="" onClick={() => handleEdit(trip.id)}>Edit</button>
                </div>
            ))}

            {/* to edit form of mytripadd */}
            {isEditFormOpen && (
                <MyTripAdd
                    tripData={editingTrip}
                    onSave={handleEditSave}
                    onCancel={handleEditCancel}
                />
            )}

        </div>
    )
};

export default MyTrip