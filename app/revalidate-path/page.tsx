import { revalidatePath } from 'next/cache';
import Navbar from '../components/Navbar';

export default function Page() {
  async function handleRevalidate() {
    'use server';
    revalidatePath('/isr'); // revalidate ISR page on-demand
  }

  return (
    <main className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Revalidate Path Demo</h1>
      <form action={handleRevalidate}>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Revalidate /isr
        </button>
      </form>
    </main>
  );
}
