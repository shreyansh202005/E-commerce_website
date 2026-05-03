import { Star } from "lucide-react";

const reviews = [
  { name: "Rajesh Sharma", city: "Ratlam", text: "Excellent quality steel utensils. Best prices in the market. Very happy with my purchase!", rating: 5 },
  { name: "Sunita Patel", city: "Indore", text: "Bought a complete kitchen set for my daughter's wedding. Beautiful quality and great service.", rating: 5 },
  { name: "Amit Jain", city: "Ujjain", text: "The pressure cooker and mixer grinder are amazing. COD option is very convenient.", rating: 4 },
  { name: "Kavita Gupta", city: "Ratlam", text: "Trusted shop. I have been buying from here for 10+ years. Always satisfied with quality.", rating: 5 },
];

const Reviews = () => (
  <section className="py-12 sm:py-16 bg-warm">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Customer <span className="text-gold">Reviews</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-xl p-5 border border-border hover:border-gold transition-colors">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-border"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-3 italic">"{r.text}"</p>
            <p className="font-bold text-sm text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.city}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Reviews;
