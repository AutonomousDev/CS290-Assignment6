import * as exercise from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;
const app = express();

// parse application/json
app.use(express.json())
   .use(express.urlencoded({ extended: true }))    // application/x-www-form-urlencoded

/*
//log body for debugning
app.post("/exercises", (req, res) => {
    console.log("*********************************************************************");
    console.log(req);
  });
*/

/**
 * Create a new movie with the title, year and language provided in the body
 */
app.post('/exercises', (req, res) => {
    exercise.createExercises(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            /// In case of an error, send back status code 400 in case of an error. 
            res.status(400).json({ Error: 'Request failed' });
        });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    console.log("***************Get exercises by id called")
    const exerciseId = req.params._id;
    exercise.findExercisesById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise)
            } 
            else{
                res.status(404).json({Error: 'Resource not found by ID'});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve Exercises. 
 * If the query parameters include a year, then only the exercises for that year are returned.
 * Otherwise, all exercises are returned.
 */
app.get('/exercises', (req, res) => {
    const filter = req.query.name === undefined
        ? {}
        : { name: req.query.name };
    if (req.query.reps !== undefined){
        filter.reps=req.query.reps
    };
    if (req.query.weight !== undefined){
        filter.weight=req.query.weight
    };
    if (req.query.unit !== undefined){
        filter.unit=req.query.unit
    };
    if (req.query.date !== undefined){
        filter.date=req.query.date
    };
    if (req.query._id !== undefined){
        filter._id=req.query._id
    };


    exercise.findExercises(filter, '', 0)
        .then(exercise => {
            console.log(exercise)
            res.send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


/**
 * Update the movie whose id is provided in the path parameter and set
 * its title, year and language to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercise.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
        }
        else {
            res.status(404).json({ Error: 'Resource not found for update'})
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ "Error" : "Request failed" });
    });
});

/**
 * Delete the movie whose id is provided in the query parameters
 */
app.delete('/exercises/:id', (req, res) => {
    exercise.deleteById(req.params.id)
        .then(deletedCount => {
            if(deletedCount === 1){
                res.status(204).send();
            }
            else {
                res.status(404).json({Error: 'Resource not found. Delete failed.'})
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: "Delete request failed" });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});