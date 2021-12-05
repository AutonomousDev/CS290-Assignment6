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
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExercise),
        });
        if (response.status === 201) {
            alert("Successfully added the exercise");
        }
        else {
            console.log()

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
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Reps"
                name="reps"
                value={reps}
                onChange={e => setReps(e.target.value)}
            />
            <input
                type="number"
                placeholder="Weight"
                name="weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <input
                type="text"
                placeholder="Units"
                name="units"
                value={unit}
                onChange={e => setUnit(e.target.value)}
            />
            <input
                type="text"
                placeholder="Date"
                name="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <button
                onClick={addExercise}
            >
                Add exercise
            </button>
        </div>
    )
}

export default AddExercisePage