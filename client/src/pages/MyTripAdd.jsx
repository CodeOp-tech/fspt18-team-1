import React, { useState } from 'react';
import "./MyTrip.css";
import { useNavigate } from 'react-router-dom';

function MyTripAdd() {
    const navigate = useNavigate();
    const [myTrip, setMyTrip] = useState({
        user_id: "1",
        name: "",
        coordinates: "",
        date: "",
        description: "",
    })

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

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/trips/',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(myTrip),
            });
            if(response.ok){
                navigate('/trips');
            };
        }catch (error) {
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
                        {/* html for vincula en lables con el id del input */}
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
                        <button className="button button__add" type="submit"> + </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default MyTripAdd