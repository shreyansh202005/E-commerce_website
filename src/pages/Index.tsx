import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import BestSellers from "@/components/BestSellers";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import AboutBusiness from "@/components/AboutBusiness";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <>
    <AnnouncementBar />
    <Header />
    <main>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <BestSellers />
      <WhyChooseUs />
      <Reviews />
      <AboutBusiness />
      <ContactSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
