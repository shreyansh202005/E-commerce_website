import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoryGrid = () => (
  <section className="py-12 sm:py-16 bg-warm">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Shop by <span className="text-primary">Categories</span>
        </h2>
        <p className="text-muted-foreground mt-2">Find everything for your kitchen</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.slice(0, 14).map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="group bg-card rounded-xl p-4 text-center hover:shadow-gold border border-border hover:border-gold transition-all duration-300"
          >
            <div className="text-3xl sm:text-4xl mb-2">{cat.icon}</div>
            <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
