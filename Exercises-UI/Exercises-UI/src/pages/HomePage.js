import ExerciseList from '../components/ExerciseList';
import { useState, eseEffect, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function HomePage() {

    const [exercises, setExercises] = useState([]);

    const loadExercisers = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

useEffect(() => {
    loadExercisers();
}, []);

    return (
        <>
            <h2>List of Movies</h2>
            <ExerciseList exercises={exercises}></ExerciseList>
            <Link to="add-exercise">Add Exercise</Link>
        </>
    );
}

export default HomePage;