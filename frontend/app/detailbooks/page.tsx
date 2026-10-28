import { Suspense } from 'react';
import DetailBuku from './DetailBuku';

export default function Page() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <DetailBuku />
    </Suspense>
  );
}