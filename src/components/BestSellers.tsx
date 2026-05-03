import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const BestSellers = () => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Best <span className="text-gold">Sellers</span>
          </h2>
          <p className="text-muted-foreground mt-2">Most loved by our customers</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
