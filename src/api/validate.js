// Shared validation, matching the rules in server/exercises_controller.mjs.
// name non-empty, reps and weight positive integers, unit lbs or kgs,
// date as YYYY-MM-DD.
export function validate({ name, reps, weight, unit, date }) {
  const errors = [];
  if (!name || !name.trim()) errors.push('Name is required.');
  if (!Number.isInteger(reps) || reps <= 0) errors.push('Reps must be a whole number greater than 0.');
  if (!Number.isInteger(weight) || weight <= 0) errors.push('Weight must be a whole number greater than 0.');
  if (unit !== 'lbs' && unit !== 'kgs') errors.push('Unit must be lbs or kgs.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) errors.push('Date is required.');
  return errors;
}
