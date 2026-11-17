/**
 * Micah Ahn
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

const ERRNOTFOUND = {"Error" : "Not found"};
const ERRINVALID =  {"Error" : "Invalid request"};

function isValidExercise(body) {
    const requiredProps = ['name', 'reps', 'weight', 'unit', 'date'];
    const bodyProps = Object.keys(body);

    if (bodyProps.length !== requiredProps.length) return false;

    for (const prop of requiredProps) {
        if (!bodyProps.includes(prop)) return false;
    }

    if (typeof body.name !== 'string' || body.name.length < 1) return false;
    if (!Number.isInteger(body.reps) || body.reps <= 0) return false;
    if (!Number.isInteger(body.weight) || body.weight <= 0) return false;
    if (body.unit !== 'kgs' && body.unit !== 'lbs') return false;
    if (!exercises.isDateValid(body.date)) return false;

    return true;
}

app.post('/exercises', asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
        res.status(400).json(ERRINVALID);
        return;
    }

    const { name, reps, weight, unit, date } = req.body;
    const exercise = await exercises.createExercise(name, reps, weight, unit, date);
    res.status(201).json(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const exercisesList = await exercises.findExercises();
    res.status(200).json(exercisesList);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const exercise = await exercises.findExerciseById(req.params._id);

    if (exercise) {
        res.status(200).json(exercise);
    } else {
        res.status(404).json(ERRNOTFOUND);
    }
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
        res.status(400).json(ERRINVALID);
        return;
    }

    const { name, reps, weight, unit, date } = req.body;
    const updatedExercise = await exercises.updateExerciseById(req.params._id, name, reps, weight, unit, date);

    if (updatedExercise) {
        res.status(200).json(updatedExercise);
    } else {
        res.status(404).json(ERRNOTFOUND);
    }   
}));

app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const deletedExercise = await exercises.deleteExerciseById(req.params._id);

    if (deletedExercise) {
        res.status(204).send();
    } else {
        res.status(404).json(ERRNOTFOUND);
    }
}));