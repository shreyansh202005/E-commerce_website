import { useParams, Link } from "react-router-dom";
import { CheckCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

interface Order {
  orderId: string;
  customer: { fullName: string; mobile: string; address: string; city: string; state: string; pincode: string };
  items: { product: { name: string; price: number }; quantity: number }[];
  total: number;
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const orders: Order[] = JSON.parse(localStorage.getItem("jkk-orders") || "[]");
  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-heading font-bold">Order not found</h1>
          <Link to="/" className="text-primary mt-4 inline-block">← Go Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Order Confirmation\nOrder ID: ${order.orderId}\nName: ${order.customer.fullName}\nMobile: ${order.customer.mobile}\nAddress: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\nProducts:\n${order.items.map((i) => `• ${i.product.name} x${i.quantity} - ₹${(i.product.price * i.quantity).toLocaleString()}`).join("\n")}\n\nTotal: ₹${order.total.toLocaleString()}\nPayment: Cash on Delivery`
  );

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mt-2">Thank you for your order</p>

          <div className="mt-8 bg-card rounded-xl p-6 border border-border text-left space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order ID</span>
              <span className="font-bold text-primary">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Phone</span>
              <span className="font-medium text-foreground">{order.customer.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment</span>
              <span className="font-medium text-gold">Cash on Delivery</span>
            </div>
            <div className="border-t border-border pt-3">
              <h3 className="font-bold text-sm mb-2 text-foreground">Products:</h3>
              {order.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{i.product.name} × {i.quantity}</span>
                  <span className="text-foreground">₹{(i.product.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">₹{order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-green-500 text-green-600 font-bold hover:bg-green-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Confirm on WhatsApp
            </a>
            <Link to="/" className="block gradient-gold text-primary-foreground py-3 rounded-lg font-bold text-center hover:opacity-90 transition-opacity">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
