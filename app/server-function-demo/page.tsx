import Navbar from '../components/Navbar';
import { revalidateHome } from '../actions/revalidateHome';

export default function ServerFunctionDemo() {
  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Server Function (Action)</h1>
      <form action={revalidateHome}>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Revalidate Home Page
        </button>
      </form>
    </main>
  );
}
