import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Exercise from "../components/Exercise";

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useNavigate();

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedExercise),
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise");
        }
        else {
            console.log()

            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        history("/");
    };

    return (

        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                name="reps"
                value={reps}
                onChange={e => setReps(e.target.value)}
            />
            <input
                type="number"
                name="weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
            />
            <input
                type="text"
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
                onClick={editExercise}
            >
                Edit exercise
            </button>
        </div>
    )
}

export default EditExercisePage