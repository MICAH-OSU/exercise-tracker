import PageLayout from '../components/PageLayout.jsx';
import { Link } from '../router.jsx';

function NotFoundPage() {
  return (
    <PageLayout>
      <section>
        <h2>Page not found</h2>
        <p><Link to="/" className="create-link">Go to the exercise list</Link></p>
      </section>
    </PageLayout>
  );
}

export default NotFoundPage;
