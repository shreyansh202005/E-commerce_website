import { Shield, Store, IndianRupee, Truck, ThumbsUp, Users } from "lucide-react";

const badges = [
  { icon: Shield, title: "Premium Quality", desc: "Only trusted brands & materials" },
  { icon: Store, title: "Retail & Wholesale", desc: "Best prices for bulk orders" },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Competitive market rates" },
  { icon: Truck, title: "Cash on Delivery", desc: "Pay when you receive" },
  { icon: ThumbsUp, title: "Easy Ordering", desc: "Simple & quick checkout" },
  { icon: Users, title: "Trusted Business", desc: "Serving families for decades" },
];

const WhyChooseUs = () => (
  <section className="py-12 sm:py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
          Why Choose <span className="text-primary">Us</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {badges.map((b) => (
          <div key={b.title} className="text-center p-4 rounded-xl bg-card border border-border hover:border-gold hover:shadow-gold transition-all duration-300">
            <div className="w-12 h-12 mx-auto gradient-maroon rounded-full flex items-center justify-center mb-3">
              <b.icon className="h-5 w-5 text-gold" />
            </div>
            <h3 className="font-bold text-sm text-foreground">{b.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
