# Jay Kumar Kasera & Company

A React ecommerce storefront for **Jay Kumar Kasera & Company**, a kitchen utensils, cookware, and home appliances business based in Ratlam, Madhya Pradesh.

The project showcases product categories, featured products, best sellers, product detail pages, cart management, Cash on Delivery checkout, and WhatsApp-based customer contact.

## Features

- Responsive homepage with hero banner, categories, featured products, best sellers, reviews, business info, and contact section
- Product listing page with search and category filtering
- Product detail pages with price, discount, SKU, stock, features, images, and COD availability
- Shopping cart with quantity management
- Checkout form for delivery details
- Cash on Delivery order flow
- Order confirmation page with generated order ID
- Orders stored locally in browser `localStorage`
- WhatsApp contact integration
- Mobile-friendly navigation and search

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui and Radix UI components
- TanStack React Query
- Lucide React icons
- Sonner and shadcn toast notifications
- Vitest for testing
- Playwright configuration included

## Project Structure

```text
src/
  components/        Reusable UI and storefront sections
  components/ui/     shadcn/ui component library
  contexts/          Cart context and cart state logic
  data/              Product and category data
  hooks/             Shared React hooks
  lib/               Utility functions
  pages/             Route pages
  test/              Test setup and example test

public/photos/       Product images served by the app
photos/              Source product photos
supaBase/            Supabase configuration folder
```

## Main Routes

- `/` - Homepage
- `/products` - All products with search/category filtering
- `/product/:id` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Delivery details and COD checkout
- `/order-confirmation/:orderId` - Order confirmation

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm run test
```

## Product Data

Products and categories are currently managed in:

```text
src/data/products.ts
```

Each product includes details such as name, category, brand, price, MRP, discount, SKU, stock, material, description, features, images, featured status, bestseller status, and COD availability.

## Order Flow

The checkout page validates required delivery fields, creates an order ID, stores the order in browser `localStorage` under `jkk-orders`, clears the cart, and redirects the customer to the order confirmation page.

Online payment and UPI support are marked as coming soon.

## Business Info

**Business:** Jay Kumar Kasera & Company  
**Location:** Ratlam, Madhya Pradesh, India  
**Products:** Kitchen utensils, cookware, pressure cookers, mixer grinders, gas stoves, copper/brass utensils, steamers, combo sets, and wholesale products  
**Payment:** Cash on Delivery currently supported  
**Contact:** WhatsApp and phone contact are integrated in the UI

