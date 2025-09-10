export default async function ServerRenderedPost() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();

  return (
    <div className="border p-4 bg-gray-100 rounded">
      <h2 className="font-semibold">Server Rendered Component</h2>
      <p>{post.body}</p>
    </div>
  );
}
