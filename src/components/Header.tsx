import { Search, ShoppingCart, Store, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { categories } from "@/data/products";

const Header = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-heading font-bold text-primary leading-tight">
              Jay Kumar Kasera<br />
              <span className="text-xs sm:text-sm font-body font-normal text-gold">& Company</span>
            </h1>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="flex w-full border-2 border-gold rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search utensils, cookware, appliances..."
                className="flex-1 px-4 py-2 text-sm bg-background text-foreground outline-none"
              />
              <button type="submit" className="gradient-gold px-4 text-primary-foreground">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Store className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link to="/cart" className="relative flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-3 flex border-2 border-gold rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-3 py-2 text-sm bg-background text-foreground outline-none"
          />
          <button type="submit" className="gradient-gold px-3 text-primary-foreground">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Category Nav - Desktop */}
      <nav className="hidden md:block gradient-maroon">
        <div className="container mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
          <Link to="/products" className="text-primary-foreground text-sm font-medium px-3 py-1 hover:bg-white/10 rounded transition-colors whitespace-nowrap">
            All Products
          </Link>
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="text-primary-foreground/80 text-sm px-3 py-1 hover:bg-white/10 rounded transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/products" className="text-gold text-sm px-3 py-1 hover:bg-white/10 rounded transition-colors whitespace-nowrap">
            More →
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border max-h-80 overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            <Link to="/products" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium text-primary">All Products</Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-foreground hover:text-primary"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
