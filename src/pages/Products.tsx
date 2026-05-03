import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products, categories, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SlidersHorizontal, X } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "low-high", label: "Price: Low to High" },
  { value: "high-low", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "bestseller", label: "Best Selling" },
];

const materials = ["Stainless Steel", "Copper", "Brass", "Non-stick", "Aluminium"];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedMaterial) result = result.filter((p) => p.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "low-high": result.sort((a, b) => a.price - b.price); break;
      case "high-low": result.sort((a, b) => b.price - a.price); break;
      case "bestseller": result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)); break;
    }

    return result;
  }, [searchParam, selectedCategory, selectedMaterial, sortBy, priceRange]);

  const activeCat = categories.find((c) => c.id === selectedCategory);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{activeCat ? activeCat.name : "All Products"}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            {searchParam ? `Results for "${searchParam}"` : activeCat ? activeCat.name : "All Products"}
          </h1>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden flex items-center gap-2 text-sm text-primary border border-primary px-3 py-2 rounded-lg">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-card p-6 overflow-y-auto" : "hidden"} md:block md:static md:w-60 flex-shrink-0 space-y-6`}>
            <div className="flex items-center justify-between md:hidden">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left text-sm px-3 py-1.5 rounded ${!selectedCategory ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded ${selectedCategory === c.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Material</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedMaterial("")}
                  className={`block w-full text-left text-sm px-3 py-1.5 rounded ${!selectedMaterial ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All Materials
                </button>
                {materials.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMaterial(m)}
                    className={`block w-full text-left text-sm px-3 py-1.5 rounded ${selectedMaterial === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-bold text-sm mb-2 text-foreground">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => { setSelectedCategory(""); setSelectedMaterial(""); setSortBy("default"); setPriceRange([0, 10000]); setFiltersOpen(false); }}
              className="w-full text-sm text-accent border border-accent px-3 py-2 rounded-lg hover:bg-accent/10"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} products found</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No products found</p>
                <p className="text-sm text-muted-foreground mt-1">Try changing your filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
