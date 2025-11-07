import React from "react";
import ProductCard from "./components/ProductCard";
import ParallaxCard from "./components/ParallaxCard";
import { sampleProduct } from "./data/product";

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-amber-100 to-pink-200">
      <ParallaxCard>
        <ProductCard product={sampleProduct} />
      </ParallaxCard>
    </main>
  );
};

export default App;