// The original passed the exercise through router state, so refreshing the
// edit page lost it. Here the id is in the URL (#/edit/<id>) and the page
// loads the record itself.
import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout.jsx';
import ExerciseForm from '../components/ExerciseForm.jsx';
import { Link, navigate } from '../router.jsx';
import { getExercise, updateExercise } from '@data';

function EditExercisePage({ id }) {
  const [exercise, setExercise] = useState(undefined);

  useEffect(() => {
    getExercise(id).then(setExercise);
  }, [id]);

  const handleSubmit = async (data) => {
    const updated = await updateExercise(id, data);
    navigate('/', { message: `Saved ${updated.name}.` });
  };

  return (
    <PageLayout>
      <section>
        <h2>Edit Exercise</h2>
        {exercise === undefined && <p>Loading…</p>}
        {exercise === null && (
          <p>That exercise wasn't found. <Link to="/" className="create-link">Back to the list</Link>.</p>
        )}
        {exercise && (
          <ExerciseForm key={exercise._id} initial={exercise} submitLabel="Save" onSubmit={handleSubmit} />
        )}
      </section>
    </PageLayout>
  );
}

export default EditExercisePage;
