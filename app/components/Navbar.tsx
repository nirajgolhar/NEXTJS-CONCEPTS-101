// app/components/Navbar.tsx
'use client';

import Link from 'next/link';

const routes = [
  { href: '/', label: 'Home (SSG)' },
  { href: '/csr', label: 'CSR' },
  { href: '/ssr', label: 'SSR' },
  { href: '/isr', label: 'ISR' },
  { href: '/ssg-blog/1', label: 'SSG + Paths' },
  { href: '/hybrid', label: 'Hybrid' },
  { href: '/server-component-demo', label: 'RSC' },
  { href: '/server-function-demo', label: 'Server Func' },
  { href: '/revalidate-path', label: 'RevalidatePath' },
  { href: '/revalidate-tag', label: 'RevalidateTag' },
  { href: '/data-structure/b-tree', label: 'B-Tree' },
  { href: '/mutual-fund-holdings', label: 'Mutual Fund Holdings' },
];

export default function Navbar() {
  return (
    <nav className="p-4 shadow bg-white sticky top-0 z-50 flex gap-3 overflow-x-auto my-2">
      {routes.map(({ href, label }) => (
        <Link key={href} href={href} className="text-blue-600 hover:underline whitespace-nowrap">
          {label}
        </Link>
      ))}
    </nav>
  );
}
