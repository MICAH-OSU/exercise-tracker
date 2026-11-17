import Navigation from './Navigation.jsx';

function PageLayout({ children }) {
  return (
    <>
      <header>
        <h1>Exercise Tracker</h1>
        <p>A React CRUD app for logging workouts</p>
        <Navigation />
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2026 Micah Ahn</p>
      </footer>
    </>
  );
}

export default PageLayout;
