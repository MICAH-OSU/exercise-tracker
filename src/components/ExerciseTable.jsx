import ExerciseRow from './ExerciseRow.jsx';

function ExerciseTable({ exercises, onDelete, onEdit }) {
  return (
    <table>
      <caption>Logged exercises</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Reps</th>
          <th scope="col">Weight</th>
          <th scope="col">Unit</th>
          <th scope="col">Date</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseRow key={exercise._id} exercise={exercise} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseTable;
