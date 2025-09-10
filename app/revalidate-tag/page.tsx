// app/revalidate-tag/page.tsx
import { revalidateTag, unstable_cache } from 'next/cache';
import Navbar from '../components/Navbar';

const fetchData = unstable_cache(
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return res.json();
  },
  ['my-tag'],
  { tags: ['my-tag'] }
);

export default async function RevalidateTagPage() {
  const post = await fetchData();

  async function handleRevalidate() {
    'use server';
    revalidateTag('my-tag');
  }

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Revalidate Tag Demo</h1>
      <p className="mb-4">{post.body}</p>
      <form action={handleRevalidate}>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Revalidate "my-tag"
        </button>
      </form>
      {/* show which data is being revalidated */}
        <p className="mt-4 text-sm text-gray-500">
            This page uses <code>revalidateTag('my-tag')</code> to revalidate the data.
        </p>
    </main>
  );
}
