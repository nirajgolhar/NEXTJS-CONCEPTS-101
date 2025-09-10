// app/components/ClientWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// ✅ Use dynamic import with ssr: false in Client Component only
const ClientOnlyThing = dynamic(() => import('./client-part'), { ssr: false });

export default function ClientWrapper() {
  return (
    <div>
      <ClientOnlyThing />
    </div>
  );
}
