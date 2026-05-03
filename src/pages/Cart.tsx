import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingCart, MessageCircle } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Your Cart is Empty</h1>
          <p className="text-muted-foreground mt-2">Add some products to get started</p>
          <Link to="/products" className="inline-block mt-6 gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-bold">
            Browse Products
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Hello, I want to order:\n${items.map((i) => `• ${i.product.name} x${i.quantity} - ₹${(i.product.price * i.quantity).toLocaleString()}`).join("\n")}\n\nTotal: ₹${subtotal.toLocaleString()}`
  );

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Shopping Cart ({totalItems} items)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card rounded-xl p-4 border border-border">
                <Link to={`/product/${product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="font-medium text-sm sm:text-base text-foreground hover:text-primary line-clamp-2">{product.name}</Link>
                  <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 border border-border rounded">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-2 py-1 text-foreground hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="px-2 text-sm font-medium text-foreground">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-2 py-1 text-foreground hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-bold text-primary">₹{(product.price * quantity).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive self-start">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl p-6 border border-border h-fit space-y-4">
            <h2 className="font-heading font-bold text-lg text-foreground">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium text-foreground">₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-gold font-medium">Local Delivery</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-medium text-foreground">Cash on Delivery</span></div>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{subtotal.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="block text-center gradient-gold text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </Link>
            <a
              href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-green-500 text-green-600 font-bold hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Order via WhatsApp
            </a>
            <p className="text-xs text-muted-foreground text-center">💳 Online Payment & UPI will be added soon.</p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Cart;
