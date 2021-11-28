import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
  return (
    <div className="App">
      <Router>

        <div className="App-header">
          <Routes>
            <Route path="/" exact element={<HomePage />}>
            </Route>
            <Route path="/add-exercise" element={<AddExercisePage />}>
            </Route>
            <Route path="/edit-exercise" element={<EditExercisePage />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
