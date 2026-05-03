import { Phone, MapPin, Truck } from "lucide-react";

const AnnouncementBar = () => (
  <div className="gradient-maroon py-2 px-4 text-center">
    <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-primary-foreground">
      <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Wholesale & Retail Available</span>
      <span className="hidden sm:inline text-gold">•</span>
      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Cash on Delivery</span>
      <span className="hidden sm:inline text-gold">•</span>
      <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> Fast Local Delivery</span>
    </div>
  </div>
);

export default AnnouncementBar;
