import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <section className="relative min-h-[560px] overflow-hidden bg-[#2b000d]">
    <div className="absolute inset-0">
      <img
        src={heroBanner}
        alt="Premium Kitchen Utensils and Cookware"
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b000d]/50 via-transparent to-transparent" />
    </div>

    <div className="relative container mx-auto flex min-h-[560px] items-center px-4 py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl space-y-6">
        <span className="inline-block rounded-full gradient-gold px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-gold sm:text-sm">
          Premium Quality Since Generations
        </span>

        <h1 className="text-4xl font-heading font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Traditional & Modern
          <span className="block text-gold">Kitchen Essentials</span>
        </h1>

        <p className="max-w-xl text-base text-white/90 sm:text-lg lg:text-xl">
          Steel, copper, brass utensils and home appliances crafted for everyday Indian kitchens.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            to="/products"
            className="rounded-lg gradient-gold px-8 py-3 text-sm font-bold text-primary-foreground shadow-gold transition-opacity hover:opacity-90 sm:text-base"
          >
            Shop Now
          </Link>
          <Link
            to="/products"
            className="rounded-lg border-2 border-gold px-8 py-3 text-sm font-bold text-gold transition-colors hover:bg-gold/10 sm:text-base"
          >
            Explore Categories
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroBanner;
