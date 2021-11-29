import ExerciseList from '../components/ExerciseList';
import { useState, eseEffect, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function HomePage() {


    const [exercises, setExercises] = useState([]);

    const onDelete = async _id => {
        console.log("onDelete called")
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if(response.status === 204){
            const newExercise = exercises.filter(m => m._id !== _id);
            setExercises(newExercise);
        }
        else{
            console.error(`Failed to delete exercise with _id = ${_id}, statuse code = ${response.status}`);
        }
    };

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }
    //useEffect calls loadExercises() to get the movie data asyncronously.
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Movies</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete}></ExerciseList>
            <Link to="add-exercise">Add Exercise</Link>
        </>
    );
}

export default HomePage;