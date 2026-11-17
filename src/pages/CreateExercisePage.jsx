import PageLayout from '../components/PageLayout.jsx';
import ExerciseForm from '../components/ExerciseForm.jsx';
import { navigate } from '../router.jsx';
import { createExercise } from '@data';

function CreateExercisePage() {
  const handleSubmit = async (data) => {
    const created = await createExercise(data);
    navigate('/', { message: `Added ${created.name}.` });
  };

  return (
    <PageLayout>
      <section>
        <h2>Create Exercise</h2>
        <ExerciseForm submitLabel="Create" onSubmit={handleSubmit} />
      </section>
    </PageLayout>
  );
}

export default CreateExercisePage;
