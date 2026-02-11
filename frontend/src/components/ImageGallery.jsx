import React, { useState } from 'react';

export default function ImageGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const hasImages = images && images.length > 0;
  const current = hasImages ? images[Math.min(active, images.length - 1)] : null;

  return (
    <section aria-label="Product image gallery" className="grid gap-3">
      <div className="rounded overflow-hidden border border-gray-200 bg-white">
        {current ? (
          <img src={current.url} alt={current.altText || 'Product image'} className="w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 grid place-items-center text-gray-400">No images</div>
        )}
      </div>
      {hasImages && (
        <div className="flex gap-2" role="tablist" aria-label="Thumbnails">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              className={`w-16 h-16 rounded overflow-hidden border ${i === active ? 'border-indigo-600' : 'border-gray-200'}`}
              onClick={() => setActive(i)}
            >
              <img src={img.url} alt={img.altText || `Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
