// ✅ app/components/AddToCartButton.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
// import { addItemToCartLocal } from '@/lib/indexedDb';

export default function AddToCartButton({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    if (!session?.user?.id) {
      setMessage("Please login to add items.");
      return;
    }

    setLoading(true);
    // await addItemToCartLocal(session.user.id, productId, 1);
    setLoading(false);
    setMessage("Added to cart!");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </div>
  );
}
