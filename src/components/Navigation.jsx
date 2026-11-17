import { Link } from '../router.jsx';

function Navigation() {
  return (
    <nav aria-label="Main">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
    </nav>
  );
}

export default Navigation;
