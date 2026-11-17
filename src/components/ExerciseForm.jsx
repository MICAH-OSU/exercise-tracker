// Shared form for the Create and Edit pages (the original duplicated this
// markup in both pages).
import { useState } from 'react';
import { validate } from '@data';

const EMPTY = { name: '', reps: '', weight: '', unit: 'lbs', date: '' };

function ExerciseForm({ initial = EMPTY, submitLabel, onSubmit }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  const set = (field) => (e) => setValues({ ...values, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      reps: Number(values.reps),
      weight: Number(values.weight),
      unit: values.unit,
      date: values.date,
    };
    const problems = validate(data);
    setErrors(problems);
    if (problems.length) return;
    setSaving(true);
    try {
      await onSubmit(data);
    } catch (err) {
      setErrors([err.message]);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.length > 0 && (
        <ul className="form-errors" role="alert">
          {errors.map((msg) => <li key={msg}>{msg}</li>)}
        </ul>
      )}
      <table>
        <thead>
          <tr>
            <th scope="col"><label htmlFor="ex-name">Name</label></th>
            <th scope="col"><label htmlFor="ex-reps">Reps</label></th>
            <th scope="col"><label htmlFor="ex-weight">Weight</label></th>
            <th scope="col"><label htmlFor="ex-unit">Unit</label></th>
            <th scope="col"><label htmlFor="ex-date">Date</label></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input id="ex-name" type="text" value={values.name} onChange={set('name')} required /></td>
            <td><input id="ex-reps" type="number" min="1" step="1" value={values.reps} onChange={set('reps')} required /></td>
            <td><input id="ex-weight" type="number" min="1" step="1" value={values.weight} onChange={set('weight')} required /></td>
            <td>
              <select id="ex-unit" value={values.unit} onChange={set('unit')}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
              </select>
            </td>
            <td><input id="ex-date" type="date" value={values.date} onChange={set('date')} required /></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
    </form>
  );
}

export default ExerciseForm;
