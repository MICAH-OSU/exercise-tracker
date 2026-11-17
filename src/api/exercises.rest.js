// Full-stack data layer: calls the Express + MongoDB REST API in server/.
// Same interface as exercises.local.js. Used when the app is started with
// `npm run dev:api` (see vite.config.js).
//
// The API stores dates as MM-DD-YY; the app works in YYYY-MM-DD (what
// <input type="date"> produces), so dates are converted at this boundary.
import { validate } from './validate.js';

export { validate };
export const supportsReset = false;

const BASE = '/exercises';

function toApiDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${m}-${d}-${y.slice(2)}`;
}

function fromApiDate(mmddyy) {
  const [m, d, y] = mmddyy.split('-');
  return `20${y}-${m}-${d}`;
}

function fromApi(exercise) {
  return { ...exercise, date: fromApiDate(exercise.date) };
}

function toApi({ name, reps, weight, unit, date }) {
  // The API rejects bodies with extra properties, so send exactly these five.
  return { name: name.trim(), reps, weight, unit, date: toApiDate(date) };
}

async function send(url, method, data) {
  const errors = validate(data);
  if (errors.length) throw new Error(errors.join(' '));
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toApi(data)),
  });
  if (response.status === 404) throw new Error('Exercise not found.');
  if (!response.ok) throw new Error('The server rejected the request.');
  return fromApi(await response.json());
}

export async function listExercises() {
  const response = await fetch(BASE);
  if (!response.ok) throw new Error('Could not load exercises.');
  const list = (await response.json()).map(fromApi);
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getExercise(id) {
  const response = await fetch(`${BASE}/${id}`);
  return response.ok ? fromApi(await response.json()) : null;
}

export const createExercise = (data) => send(BASE, 'POST', data);

export const updateExercise = (id, data) => send(`${BASE}/${id}`, 'PUT', data);

export async function deleteExercise(id) {
  const response = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (response.status !== 204) throw new Error('Exercise not found.');
}

export async function resetExercises() {
  throw new Error('Reset is only available in the browser-only demo.');
}
