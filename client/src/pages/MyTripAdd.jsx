import React, { useState, useEffect, useCallback } from 'react';
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
        imageName: "",
        imageDescription: ""
    })
    const[imageFile,SetImageFile] = useState(null);


    
    
    
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
        } else {
            setMyTrip({
                user_id: "1",
                name: "",
                coordinates: "",
                date: "",
                description: "",
                // imageName: "",
                imageDescription: "",
            })
        }
    }, [trip_id]);
    
    const handleFileChange = (event) => {
        console.log('File input changed:', event.target.files[0]); // Check if files are defined
        SetImageFile(event.target.files[0]); 

        // if (imageFile) {
        //     // Agregar el nuevo objeto de imagen a la matriz existente
        //     setMyTrip((myTrip) => ({ ...myTrip, imageName: imageFile.name }));
        // } else {
        //     // Handle the case where no file was selected
        //     console.log('No file selected.');
        // };
    };
    
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
                };
            } else {
                // Subir el archivo al servidor
                const formData = new FormData();
                formData.append('imageFile', imageFile, imageFile.name);
                //subir mytrip
                formData.append('user_id', myTrip.user_id);
                formData.append('name', myTrip.name);
                formData.append('coordinates', myTrip.coordinates);
                formData.append('date', myTrip.date);
                formData.append('description', myTrip.description);
                // formData.append('imageName', myTrip.imageName);
                formData.append('imageDescription', myTrip.imageDescription);
                //Adding a new trip + image file
                const response = await fetch('http://localhost:5000/api/trips/', {
                    method: 'POST',
                    headers: {
                        "enctype":"multipart/form-data"
                    },
                    body: formData,
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
            // imageName: "",
            imageDescription: "",
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
            // imageName: "",
            imageDescription: "",
        });
        // 2. Puedes mostrar un mensaje de confirmación o realizar otras acciones adicionales aquí
        alert("No trip added")
        // 3. Navega de vuelta a la lista de viajes u otro lugar en tu aplicación
        navigate('/trips');
    };

    return (
        <div className="login-container">
            <h1 className="pt-14 pb-20">Add Trip</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">MyTrip Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={myTrip.name}
                            onChange={handleChange}
                            placeholder="New Mytrip Name"
                            />
                        <div>
                            <label className="uploadForm__label" htmlFor="file">Click to choose a file and upload </label>
                            <input className="uploadFom__input" type='file' name='file' id="file" onChange={handleFileChange}></input>
                        </div>
                        <p></p>
                        <div className="form__element mb-4" >
                            <label className="w-36 inline-flex" htmlFor="imageDescription">Image Description:</label>
                            <input 
                                id="imageDescription"
                                name="imageDescription"
                                type="text"
                                value={myTrip.imageDescription}
                                onChange={handleChange}
                                placeholder="Insert an image description"
                            />
                        </div>
                        <div className="form__element mb-4" >
                            {/* html for vincula en labels con el id del input */}
                            <label htmlFor="coordinates">Where:</label>
                            <input 
                                id="coordinates"
                                name="coordinates"
                                type="text"
                                value={myTrip.coordinates}
                                onChange={handleChange}
                                placeholder="Add coordinates"
                            />
                            <p></p>
                        </div>
                        <div className="form__element mb-4" >
                            <label htmlFor="date">When:</label>
                            <input 
                                id="date"
                                name="date"
                                type="date"
                                value={myTrip.date}
                                onChange={handleChange}
                                placeholder="Add date"
                            />
                            <p></p>
                        </div>

                        <p></p>
                        <div className="form__element mb-4" >
                            <label htmlFor="name">MyTrip Notes:</label>
                            <textarea 
                                id="description"
                                name="description"
                                type="text"
                                value={myTrip.description}
                                onChange={handleChange}
                                placeholder="Write your notes here"
                            />
                            <p></p>
                        </div>
                        <div className="form__element mb-4" >
                            <p></p>
                            <button className="button button__add" type="submit"> {trip_id ? 'Save' : '+'} </button>
                            <button className="button button__cancel" onClick={handleCancel}>Cancel</button>
                        </div>
                </form>
        </div>
    )
};

export default MyTripAdd