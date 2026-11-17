/**
 * Micah Ahn
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true },
    reps: {type: Number, required: true },
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true},
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const EXERCISE_CLASS = 'Exercise';
const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);


/**
 * Create a Exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name, reps, weight, unit, date});
    return exercise.save();
}

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

const findExercises = async () => {
    return await Exercise.find();
}

const findExerciseById = async (_id) => {
    return await Exercise.findById(_id);
}

const updateExerciseById = async (_id, name, reps, weight, unit, date) => {
    return await Exercise.findByIdAndUpdate(
        _id,
        { name, reps, weight, unit, date },
        { new: true }
    );
}

const deleteExerciseById = async (_id) => {
    return await Exercise.findByIdAndDelete(_id);
}

export {connect, createExercise, findExercises, findExerciseById, updateExerciseById, deleteExerciseById, isDateValid};