import { Suspense } from 'react';
import DetailBuku from './DetailBuku';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Memuat detail buku...</div>}>
      <DetailBuku />
    </Suspense>
  );
}