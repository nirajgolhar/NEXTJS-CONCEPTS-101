import ServerRenderedPost from '../components/ServerRenderedPost';
import Navbar from '../components/Navbar';

export default function ServerComponentDemo() {
  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">React Server Component</h1>
      <ServerRenderedPost />
    </main>
  );
}
