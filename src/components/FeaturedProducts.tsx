import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Featured <span className="text-primary">Products</span>
          </h2>
          <p className="text-muted-foreground mt-2">Handpicked premium quality items</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
