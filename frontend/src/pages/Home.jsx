import React from 'react';
import Carousel from '../components/Carousel.jsx';

export default function Home() {
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-extrabold">Discover Bold Shoes</h1>
      <Carousel />
      <p className="text-gray-600">Modern, dynamic landing with bold visuals and featured products.</p>
    </section>
  );
}
