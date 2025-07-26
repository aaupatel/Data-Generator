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
- 💳 Razorpay-powered subscription billing (Free, Silver, Gold)
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
git clone https://github.com/aaupatel/Data-Generator.git
cd data-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables
>Create a .env file and include:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret

MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=database-data-generator

RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-app-password

JWT_SECRET=your-jwt-secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```
Visit http://localhost:3000 in your browser.