import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import PageLayout from '../components/PageLayout.jsx';
import ExerciseTable from '../components/ExerciseTable.jsx';
import { Link, navigate, takeNavigationState } from '../router.jsx';
import { listExercises, deleteExercise, resetExercises, supportsReset } from '@data';

function HomePage() {
  const [exercises, setExercises] = useState(null);
  const [message, setMessage] = useState(() => takeNavigationState()?.message || '');

  const load = async () => {
    try {
      setExercises(await listExercises());
    } catch (err) {
      setExercises([]);
      setMessage(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (exercise) => {
    if (!window.confirm(`Delete ${exercise.name}?`)) return;
    try {
      await deleteExercise(exercise._id);
      setExercises((list) => list.filter((e) => e._id !== exercise._id));
      setMessage(`Deleted ${exercise.name}.`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onEdit = (exercise) => navigate(`/edit/${exercise._id}`);

  const onReset = async () => {
    await resetExercises();
    await load();
    setMessage('Demo data restored.');
  };

  return (
    <PageLayout>
      <section>
        <h2>Your Exercises</h2>
        {message && <p className="status" role="status">{message}</p>}
        {exercises === null ? (
          <p>Loading…</p>
        ) : exercises.length === 0 ? (
          <p className="empty">No exercises yet. <Link to="/create" className="create-link">Add one</Link>.</p>
        ) : (
          <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit} />
        )}
        <div className="actions">
          <Link to="/create" className="create-link"><MdAdd aria-hidden="true" /> Add exercise</Link>
          {supportsReset && (
            <button type="button" className="secondary" onClick={onReset}>Reset demo data</button>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePage;
