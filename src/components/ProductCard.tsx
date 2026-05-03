import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/product/${product.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-gold transition-all duration-300">
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
        {product.isBestseller && (
          <span className="absolute top-2 right-2 gradient-maroon text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4 space-y-2">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 gradient-gold text-primary-foreground text-xs sm:text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
