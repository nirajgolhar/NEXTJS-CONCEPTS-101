// app/hybrid/page.tsx
import Navbar from '../components/Navbar';
import ClientWrapper from './ClientWrapper';

export default async function HybridPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'no-store',
  });
  const post = await res.json();

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Hybrid Rendering</h1>
      <p><strong>SSR Part:</strong> {post.body}</p>
      <ClientWrapper />
    </main>
  );
}
