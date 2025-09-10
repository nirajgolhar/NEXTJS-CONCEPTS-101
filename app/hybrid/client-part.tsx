'use client';

import { useState, useEffect } from 'react';

export default function ClientPart() {
  const [comment, setComment] = useState<any>();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments/1')
      .then((res) => res.json())
      .then(setComment);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">CSR Part</h2>
      <p>{comment ? comment.body : 'Loading...'}</p>
    </div>
  );
}
