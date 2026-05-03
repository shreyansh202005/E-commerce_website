import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground pt-12 pb-6">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-heading font-bold text-lg mb-3">Jay Kumar Kasera & Company</h3>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Your trusted destination for premium kitchen utensils, cookware, and home appliances in Ratlam.
          </p>
          <p className="text-xs text-gold mt-3">Cash on Delivery Available</p>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <Link to="/" className="block hover:text-gold transition-colors">Home</Link>
            <Link to="/products" className="block hover:text-gold transition-colors">All Products</Link>
            <Link to="/cart" className="block hover:text-gold transition-colors">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Categories</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            {categories.slice(0, 6).map((c) => (
              <Link key={c.id} to={`/products?category=${c.id}`} className="block hover:text-gold transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Contact Info</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <p>📍 Ratlam, Madhya Pradesh</p>
            <p>📞 +91 9827210991</p>
            <p>💬 WhatsApp Available </p>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-gold font-medium">💳 Online Payment & UPI coming soon!</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-primary-foreground/50">
        © 2026 Jay Kumar Kasera & Company. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
