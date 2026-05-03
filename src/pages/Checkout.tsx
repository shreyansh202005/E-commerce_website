import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", mobile: "", altMobile: "", address: "", landmark: "", city: "", state: "Madhya Pradesh", pincode: "", notes: "",
  });

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-heading font-bold">No items to checkout</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">← Browse Products</Link>
        </main>
        <Footer />
      </>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.mobile || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all required fields");
      return;
    }
    const orderId = `JKK-${Date.now().toString(36).toUpperCase()}`;
    const orderData = { orderId, customer: form, items, total: subtotal, paymentMethod: "COD", status: "Pending", date: new Date().toISOString() };
    // Store order locally for now
    const orders = JSON.parse(localStorage.getItem("jkk-orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("jkk-orders", JSON.stringify(orders));
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors";

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
              <h2 className="font-bold text-foreground">Delivery Details</h2>
              <input type="text" placeholder="Full Name *" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required className={inputClass} />
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="tel" placeholder="Mobile Number *" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} required className={inputClass} />
                <input type="tel" placeholder="Alternate Number" value={form.altMobile} onChange={(e) => update("altMobile", e.target.value)} className={inputClass} />
              </div>
              <textarea placeholder="Full Address *" value={form.address} onChange={(e) => update("address", e.target.value)} required rows={2} className={`${inputClass} resize-none`} />
              <input type="text" placeholder="Landmark" value={form.landmark} onChange={(e) => update("landmark", e.target.value)} className={inputClass} />
              <div className="grid sm:grid-cols-3 gap-4">
                <input type="text" placeholder="City *" value={form.city} onChange={(e) => update("city", e.target.value)} required className={inputClass} />
                <input type="text" placeholder="State" value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} />
                <input type="text" placeholder="Pincode *" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} required className={inputClass} />
              </div>
              <textarea placeholder="Order Notes (optional)" value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} className={`${inputClass} resize-none`} />
            </div>

            {/* Payment */}
            <div className="bg-card rounded-xl p-6 border border-border space-y-3">
              <h2 className="font-bold text-foreground">Payment Method</h2>
              <div className="flex items-center gap-3 bg-warm p-4 rounded-lg border-2 border-gold">
                <Truck className="h-5 w-5 text-gold" />
                <div>
                  <p className="font-bold text-sm text-foreground">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">💳 Online payment and UPI will be added soon.</p>
            </div>

            <button type="submit" className="w-full gradient-gold text-primary-foreground py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-gold">
              Place Order — ₹{subtotal.toLocaleString()} (COD)
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-card rounded-xl p-6 border border-border h-fit space-y-4">
            <h2 className="font-heading font-bold text-lg text-foreground">Order Summary</h2>
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{product.name} × {quantity}</span>
                  <span className="font-medium text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
