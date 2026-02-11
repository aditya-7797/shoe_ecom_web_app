import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  // Use actual product images if available, otherwise use unique fallback images
  let imgSrc;
  
  if (product.images && product.images.length > 0) {
    // Use the first image from the product's image gallery
    imgSrc = product.images[0].url;
  } else if (product.imageUrl) {
    // Use the imageUrl field if available (backward compatibility)
    imgSrc = product.imageUrl;
  } else {
    // Fallback to unique shoe images for each product
    const fallbackImages = [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1465453869711-7e174808ace9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    imgSrc = fallbackImages[(product.id - 1) % fallbackImages.length] || fallbackImages[0];
  }
  
  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div 
      className="block cursor-pointer" 
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.modelName}`}
    >
      <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition">
        <img 
          src={imgSrc} 
          alt={product.modelName || 'Shoes'} 
          className="w-full h-40 object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 truncate">{product.modelName}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold">${Number(product.price).toFixed(2)}</span>
            <span className="text-sm" aria-label={`Rating ${product.rating}`}>⭐ {product.rating}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
