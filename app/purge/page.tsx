import { revalidatePath, revalidateTag } from 'next/cache';

async function purgeSSGData() {
  revalidatePath('/');
  revalidateTag('my-tag');
}
export default async function PurgePage() {
  async function handlePurge() {
    'use server';
    await purgeSSGData();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Purge SSG Data</h1>
      <form action={handlePurge}>
        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
          Purge SSG Data
        </button>
      </form>
    </main>
  );
}