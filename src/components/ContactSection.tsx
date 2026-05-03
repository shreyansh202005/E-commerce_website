import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Name: ${form.name}%0APhone: ${form.phone}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/917354369081?text=${whatsappMsg}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <section className="py-12 sm:py-16 gradient-maroon">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground">
            Contact <span className="text-gold">Us</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6 text-primary-foreground">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Store Location</h3>
                <p className="text-sm text-primary-foreground/80">Ratlam, Madhya Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">Phone</h3>
                <p className="text-sm text-primary-foreground/80">+91 98272-10991</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold">WhatsApp</h3>
                <p className="text-sm text-primary-foreground/80">Chat with us for quick responses</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none focus:border-gold transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none focus:border-gold transition-colors"
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm outline-none focus:border-gold transition-colors resize-none"
            />
            <button type="submit" className="w-full gradient-gold text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
