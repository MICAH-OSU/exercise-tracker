import { useHashPath } from './router.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const path = useHashPath();

  if (path === '/') return <HomePage />;
  if (path === '/create') return <CreateExercisePage />;
  const edit = path.match(/^\/edit\/([\w-]+)$/);
  if (edit) return <EditExercisePage id={edit[1]} />;
  return <NotFoundPage />;
}

export default App;
