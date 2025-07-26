# 📊 Data Generator

**Data Generator** is a powerful and flexible web-based tool that helps developers, testers, and data analysts generate realistic sample data for their applications and databases.

> Built with Next.js, Tailwind CSS, and MongoDB — with complete support for authentication, subscription-based plans, and multi-format export options.

---

## 🌟 Key Features

- ✅ Generate data in multiple formats (MySQL, PostgreSQL, MongoDB, JSON)
- 🌍 Support for multiple languages
- 🔧 Customizable field selection
- 💾 Download large datasets based on subscription
- 🔐 Secure authentication (with JWT & NextAuth)
- 💳 Stripe-powered subscription billing (Free, Silver, Gold)
- 📈 Clean, responsive UI with TailwindCSS + Radix UI
- 📅 Daily limits enforced with plan-based restrictions

---

## 🧪 Use Cases

- Developers seeding test databases
- QA testers needing realistic mock data
- Data science teams prototyping models
- Education/training environments

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/data-generator.git
cd data-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
>Create a .env file and include:
```bash
DATABASE_URL=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Run the development server

```bash
npm run dev
```
Visit http://localhost:3000 in your browser.