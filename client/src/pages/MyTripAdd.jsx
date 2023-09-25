import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./MyTrip.css";

//tripData prop is to receive data to edit the trip
function MyTripAdd() {
    const { trip_id } = useParams();
    const navigate = useNavigate();
    const [myTrip, setMyTrip] = useState({
        user_id: "1",
        name: "",
        coordinates: "",
        date: "",
        description: "",
    })

    // Use useEffect to populate the form with existing trip data if it's provided
    useEffect(() => {
        if (trip_id) {
            // Realiza una solicitud al servidor para obtener los datos del viaje por trip_id
            fetch(`http://localhost:5000/api/trips/${trip_id}`)
                .then((response) => response.json())
                .then((data) => {
                    setMyTrip(data[0]);
                })
                .catch((error) => {
                    console.log('Oops! Something went wrong');
                });
        }
    }, [trip_id]);

    const handleChange = (event) => {
        //cada elemento del event target
        const element = event.target;
        // se crea una constante name porque en cada input vamos a usar el atributo name para decir que key value del objecto my trip estamos cambiando.
        const name = element.name;
        // se crea una constante value porque en cada input vamos a usar el atributo value para decir que valeor del key value del objecto my trip estamos cambiando.
        const value = element.value;
        //se define el objeto my trip arrina definido
        setMyTrip((myTrip) => ({ ...myTrip, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            //check if trip data exists- to edit and not create a new trip
            if (trip_id) {
                // Editing an existing trip
                const response = await fetch(`http://localhost:5000/api/trips/${trip_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(myTrip),
                });
                if (response.ok) {
                    navigate('/trips');
                }
            } else {
                //Adding a new trip
                const response = await fetch('http://localhost:5000/api/trips/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(myTrip),
                });
                if (response.ok) {
                    navigate('/trips');
                };
            }
        } catch (error) {
            console.error("Error adding trip:", error);
        };
        //limpia a setMytRIP
        setMyTrip({
            user_id: "1",
            name: "",
            coordinates: "",
            date: "",
            description: "",
        });
    };
    
    const handleCancel = () => {
        if (trip_id) {
            // Si trip_id está definido (estamos en modo de edición), cancelar la edición
            navigate('/trips'); // Navega de vuelta a la lista de viajes sin guardar cambios
        } else {
            // Si trip_id no está definido (estamos en modo de adición), cancelar la adición
            onCancelAdd(); // Llama a una función específica para cancelar la adición
        }
    };
    
    const onCancelAdd = () => {
        // 1. Limpia el formulario
        setMyTrip({
            user_id: "1",
            name: "",
            coordinates: "",
            date: "",
            description: "",
        });
        // 2. Puedes mostrar un mensaje de confirmación o realizar otras acciones adicionales aquí
        alert("No trip added")
        // 3. Navega de vuelta a la lista de viajes u otro lugar en tu aplicación
        navigate('/trips');
    };
    
    return (
        <div>
            <div>MyTrip</div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__elementcontainer">
                    <div className="form__element" >
                        <label htmlFor="name">MyTrip Name:</label>
                        <input className="form__element__input"
                            id="name"
                            name="name"
                            type="text"
                            value={myTrip.name}
                            onChange={handleChange}
                            placeholder="New Mytrip Name"
                        />
                    </div>
                    <div className="form__element" >
                        {/* html for vincula en labels con el id del input */}
                        <label htmlFor="coordinates">Where:</label>
                        <input className="form__element__input"
                            id="coordinates"
                            name="coordinates"
                            type="text"
                            value={myTrip.coordinates}
                            onChange={handleChange}
                            placeholder="Add coordinates"
                        />
                    </div>
                    <div className="form__element" >
                        <label htmlFor="date">When:</label>
                        <input className="form__element__input"
                            id="date"
                            name="date"
                            type="date"
                            value={myTrip.date}
                            onChange={handleChange}
                            placeholder="Add date"
                        />
                    </div>
                    <div className="form__element" >
                        <label htmlFor="name">MyTrip Notes:</label>
                        <textarea className="form__element__input"
                            id="description"
                            name="description"
                            type="text"
                            value={myTrip.description}
                            onChange={handleChange}
                            placeholder="Write your notes here"
                        />
                    </div>
                    <div className="form__element">
                        <button className="button button__add" type="submit"> {trip_id ? 'Save' : '+'} </button>
                        <button className="button button__cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default MyTripAdd