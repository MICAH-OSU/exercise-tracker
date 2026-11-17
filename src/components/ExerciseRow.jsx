import { MdDelete, MdEdit } from 'react-icons/md';
import { formatDate } from '../format.js';

function ExerciseRow({ exercise, onDelete, onEdit }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{formatDate(exercise.date)}</td>
      <td>
        <button type="button" className="icon-button" aria-label={`Edit ${exercise.name}`} onClick={() => onEdit(exercise)}>
          <MdEdit />
        </button>
      </td>
      <td>
        <button type="button" className="icon-button" aria-label={`Delete ${exercise.name}`} onClick={() => onDelete(exercise)}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
}

export default ExerciseRow;
