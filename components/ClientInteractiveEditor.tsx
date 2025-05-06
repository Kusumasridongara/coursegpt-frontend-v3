// components/ClientInteractiveEditor.tsx
'use client';

import dynamic from 'next/dynamic';

const InteractiveEditor = dynamic(() => import('./InteractiveEditor'), {
  ssr: false,  // Ensures it's only rendered on the client-side
});

export default InteractiveEditor;
