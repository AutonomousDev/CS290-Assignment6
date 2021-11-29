import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date }
        const response = await fetch('/exercises', {
            method: "POST", 
            body: JSON.stringify(newExercise),
            header: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise");
        }
        else{
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Exercise Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="string"
                placeholder="Units"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="string"
                placeholder="Date"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    )
}

export default AddExercisePage