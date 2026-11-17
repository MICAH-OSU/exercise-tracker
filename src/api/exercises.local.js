// Browser-only data layer (the default). Stores exercises in localStorage so
// the app runs as a static site with no server, e.g. on GitHub Pages.
// exercises.rest.js has the same interface but calls the Express API in
// server/. vite.config.js picks one of the two as "@data".
import { validate } from './validate.js';

export { validate };
export const supportsReset = true;

const STORAGE_KEY = 'exercise-tracker:exercises';

const SEED = [
  { _id: 'seed-1', name: 'Squat', reps: 8, weight: 135, unit: 'lbs', date: '2026-11-02' },
  { _id: 'seed-2', name: 'Bench Press', reps: 10, weight: 95, unit: 'lbs', date: '2026-11-04' },
  { _id: 'seed-3', name: 'Deadlift', reps: 5, weight: 80, unit: 'kgs', date: '2026-11-06' },
];

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...SEED];
  } catch {
    return [...SEED];
  }
}

function write(exercises) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  } catch {
    // Storage can be unavailable (private browsing); the app still works
    // for the current page view.
  }
}

function newId() {
  return `ex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function listExercises() {
  return read().sort((a, b) => a.date.localeCompare(b.date));
}

export async function getExercise(id) {
  return read().find((e) => e._id === id) || null;
}

export async function createExercise(data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join(' '));
  const exercise = { _id: newId(), ...data, name: data.name.trim() };
  write([...read(), exercise]);
  return exercise;
}

export async function updateExercise(id, data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join(' '));
  const exercises = read();
  const index = exercises.findIndex((e) => e._id === id);
  if (index === -1) throw new Error('Exercise not found.');
  exercises[index] = { ...exercises[index], ...data, name: data.name.trim() };
  write(exercises);
  return exercises[index];
}

export async function deleteExercise(id) {
  const exercises = read();
  const remaining = exercises.filter((e) => e._id !== id);
  if (remaining.length === exercises.length) throw new Error('Exercise not found.');
  write(remaining);
}

export async function resetExercises() {
  write([...SEED]);
}
