import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  { id: 1, title: 'Bold New Arrivals', desc: 'Step into 2026 with style.' },
  { id: 2, title: 'Performance Picks', desc: 'Speed, comfort, durability.' },
  { id: 3, title: 'Limited Editions', desc: 'Make every step unique.' },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <section
      className="relative w-full h-64 rounded-lg overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured promotions"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
      <div className="relative h-full grid place-items-center text-white text-center">
        <div aria-live="polite">
          <h2 className="text-2xl font-extrabold">{slides[index].title}</h2>
          <p className="mt-1 text-sm opacity-90">{slides[index].desc}</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className="m-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded"
          aria-label="Previous slide"
          onClick={prev}
        >
          ◀
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className="m-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded"
          aria-label="Next slide"
          onClick={next}
        >
          ▶
        </button>
      </div>
    </section>
  );
}
