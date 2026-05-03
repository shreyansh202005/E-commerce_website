import { useParams, Link } from "react-router-dom";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ShoppingCart, Truck, MessageCircle, ChevronRight } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-heading font-bold">Product Not Found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">← Browse Products</Link>
        </div>
        <Footer />
      </>
    );
  }

  const cat = categories.find((c) => c.id === product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    window.location.href = "/cart";
  };

  const whatsappMsg = encodeURIComponent(`Hello, I want to order: ${product.name} (₹${product.price}) - SKU: ${product.sku}`);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-3 w-3" />
          {cat && <><Link to={`/products?category=${cat.id}`} className="hover:text-primary">{cat.name}</Link><ChevronRight className="h-3 w-3" /></>}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-muted rounded-xl aspect-square flex items-center justify-center overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gold font-medium">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
                  <span className="bg-accent text-accent-foreground text-sm font-bold px-2 py-0.5 rounded">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">SKU:</span> <span className="font-medium text-foreground">{product.sku}</span></div>
              <div><span className="text-muted-foreground">Material:</span> <span className="font-medium text-foreground">{product.material}</span></div>
              {product.size && <div><span className="text-muted-foreground">Size:</span> <span className="font-medium text-foreground">{product.size}</span></div>}
              {product.power && <div><span className="text-muted-foreground">Power:</span> <span className="font-medium text-foreground">{product.power}</span></div>}
              <div><span className="text-muted-foreground">Stock:</span> <span className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span></div>
              <div><span className="text-muted-foreground">Category:</span> <span className="font-medium text-foreground">{cat?.name}</span></div>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-2">Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-gold mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* COD Badge */}
            <div className="flex items-center gap-2 bg-warm p-3 rounded-lg border border-border">
              <Truck className="h-5 w-5 text-gold" />
              <span className="text-sm font-medium text-foreground">Cash on Delivery Available</span>
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-lg font-bold text-foreground hover:bg-muted">−</button>
                <span className="px-4 py-2 text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-lg font-bold text-foreground hover:bg-muted">+</button>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 gradient-gold text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 gradient-maroon text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                Buy Now
              </button>
            </div>

            <a
              href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-green-500 text-green-600 font-bold hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Order via WhatsApp
            </a>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-heading font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default ProductDetail;
