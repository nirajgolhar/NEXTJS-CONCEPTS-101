import Navbar from '../components/Navbar';

export const dynamic = 'force-dynamic'; // SSR on every request

export default async function SSRPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    cache: 'no-store',
  });
  const posts = await res.json();

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Server-Side Rendering (SSR)</h1>
      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post.id} className="border-b pb-2">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
