'use client';

// app/csr/page.tsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function CSRPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Client-Side Rendering (CSR)</h1>
      {posts.length ? (
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm">{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
