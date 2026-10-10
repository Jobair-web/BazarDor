

# 🛒 বাজার দর (BazarDor)

**আজকের বাজারের দাম এক নজরে**

A responsive Bangla grocery price tracker built with Next.js. Compare today's prices of rice, pulses, oil, vegetables, fish, meat, dairy and spices across markets and divisions of Bangladesh.



## 📖 About the Project

**BazarDor (বাজার দর)** shows daily essential-commodity prices in Bengali. It highlights which products got more expensive or cheaper today, lets users browse by category, and, for signed-in users, shows a detailed market-wise price breakdown (minimum, maximum and average price per market).

Prices are fetched from a public REST API (`api.api-store.workers.dev`) through a single, typed API client.

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server and Client Components) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + DaisyUI v5 (custom green theme) |
| Authentication | BetterAuth (Email/Password + Google and GitHub OAuth) |
| Database | MongoDB Atlas (user and session storage) |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Font | Hind Siliguri (Google Fonts, Bengali) |
| Deployment | Netlify |

## ✨ Features

1. **Live price ticker:** an infinitely scrolling marquee showing each product's emoji, name, price and change percentage (▲/▼), pausing on hover.
2. **Dynamic navigation:** category links fetched from the API, active-category highlighting, and the current date in Bengali.
3. **Home page insights:** top 6 price risers, top 6 fallers, and a responsive grid of all 33 products with prices in Bengali numerals.
4. **Category pages with sorting:** filter by category and sort by price (low to high / high to low) with correct numeric sorting, plus skeleton loaders and a friendly invalid-category state.
5. **Protected product details:** signed-in users see minimum, maximum and average prices and a market-wise price table; guests are redirected to sign in with a toast.
6. **Authentication:** email/password sign up and sign in, Google and GitHub OAuth, and sign out from a user dropdown.
7. **Profile management:** a protected profile page and an update form to change the display name and profile image.
8. **Polished UX:** loading skeletons, custom 404 page, toast feedback for every action, and a fully responsive layout.

## 🗺️ Routes

| Route | Description | Access |
|---|---|---|
| `/` | Home: hero, risers, fallers, all products | Public |
| `/category/[slug]` | Products of a category with sorting | Public |
| `/product/[id]` | Price summary and market-wise table | 🔒 Signed-in |
| `/signin`, `/signup` | Authentication pages | Public |
| `/profile` | User details | 🔒 Signed-in |
| `/profile/update` | Update name and image | 🔒 Signed-in |

## 🌐 API

Base URL: `https://api.api-store.workers.dev`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bazardor/categories` | All categories |
| GET | `/api/bazardor/categories/:slug` | Single category |
| GET | `/api/bazardor/products` | All products |
| GET | `/api/bazardor/products?category=:slug` | Products by category |
| GET | `/api/bazardor/products/:id` | Single product with market data |

All requests go through `lib/api.ts` (typed `fetch` wrapper with error handling and 5-minute revalidation).

## 📁 Project Structure

```
├── app/
│   ├── api/auth/[...all]/   # BetterAuth route handler
│   ├── category/[slug]/     # Category page + loading skeleton
│   ├── product/[id]/        # Protected product details
│   ├── profile/             # Profile and update pages
│   ├── signin/ signup/      # Auth pages
│   ├── layout.tsx           # Navbar, ticker, footer, toaster
│   ├── page.tsx             # Home page
│   └── not-found.tsx        # Custom 404
├── components/              # Reusable UI components
├── lib/                     # api.ts, auth.ts, auth-client.ts, session.ts, utilities
├── types/                   # TypeScript interfaces
├── public/                  # Images
└── proxy.ts                 # Route protection


