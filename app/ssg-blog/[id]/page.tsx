import { getExecutionInfo } from '@/lib/executionInfo';
import Navbar from '@/app/components/Navbar';

// `generateStaticParams` defines which params are available at build time
export const generateStaticParams = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  const posts = await res.json();
  return posts.map((post: any) => ({ id: post.id.toString() }));
};

// Explicitly type props for clarity
type BlogPageProps = {
  params: {
    id: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    cache: 'force-cache',
  });
  const post = await res.json();

  const exec = getExecutionInfo('SSG with generateStaticParams');

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">SSG Blog Detail</h1>
      <p><strong>Title:</strong> {post.title}</p>
      <p className="mb-4"><strong>Content:</strong> {post.body}</p>
      <pre className="bg-gray-100 p-2 rounded text-sm">
        {JSON.stringify(exec, null, 2)}
      </pre>
    </main>
  );
}
