import React from "react";
import ProductCard from "./components/ProductCard";
import ParallaxCard from "./components/ParallaxCard";
import { sampleProduct } from "./data/product";
import ReviewCard from "./components/ReviewCard";
import { sampleReviews } from "./data/reviews";

const App: React.FC = () => {
  // For desktop view
  const leftReviews = sampleReviews.slice(0, 2);
  const rightReviews = sampleReviews.slice(2);

  return (
    <main className="min-h-screen w-full flex justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
        
        {/* --- DESKTOP-ONLY Left Column --- */}
        <div className="hidden lg:flex flex-col gap-8 w-1/4 pt-16">
          {leftReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* --- Center Product Card (for all sizes) --- */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ParallaxCard>
            <ProductCard product={sampleProduct} />
          </ParallaxCard>
        </div>

        {/* --- DESKTOP-ONLY Right Column --- */}
        <div className="hidden lg:flex flex-col gap-8 w-1/4 pt-16">
          {rightReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* --- MOBILE-ONLY Reviews Section --- */}
        <div className="lg:hidden w-full flex flex-col items-center gap-8 mt-8">
          <h2 className="text-3xl font-bold text-white">What Our Customers Say</h2>
          {sampleReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default App;