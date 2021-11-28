// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, enum: ['kgs', 'lbs'], required: true}, 
    date: {type: String, required: true}
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */

const Exercises = mongoose.model("Exercises", exerciseSchema);

const createExercises = async (name, reps, weight, unit, date) => {
    //Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercises({name:name, reps:reps, weight:weight, unit:unit, date:date});
    //Call save to persist this object as a document in MongoDB
    return exercise.save();
}

/**
 * Find the exercise with the given ID value
 * @param {String} _id 
 * @returns 
 */

const findExercisesById = async (_id) => {
    const query = Exercises.findById(_id);
    return query.exec();
}

const findExercises = async (filter, projection, limit) => {
    const query = Exercises.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    const result = await Exercises.updateOne({ _id:_id }, { name: name, reps: reps, weight: weight, unit: unit, date: date });
    console.log(result);
    console.log(result.modifiedCount);
    return result.modifiedCount;
}

const deleteById = async(_id) => {
    const result = await Exercises.deleteOne({ _id: _id });
    //return the count of the deleted document. Since we called deleteOne, This will be either 0 or 1.
    return result.deletedCount;
}

export {createExercises, findExercisesById, findExercises, replaceExercise, deleteById}