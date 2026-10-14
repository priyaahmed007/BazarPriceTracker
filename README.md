# 🛒 বাজার দর — BazarDor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে**

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · DaisyUI · Better Auth

---

## 📖 Project Description

**বাজার দর (BazarDor)** is a responsive market price-tracking web application designed to help people in Bangladesh easily check the latest prices of everyday products. It provides product prices, price fluctuations, category-based browsing, and market-wise price comparisons through a clean and user-friendly interface.

Users can explore essential products, search by name, filter products by category, sort prices, and view detailed price information. The application also includes authentication features, protected pages, and profile management to provide a more personalized experience.

The entire interface is designed in Bengali, including Bengali numerals, making the platform more accessible to local users. Its responsive layout supports mobile phones, tablets, and desktop screens.

---

## ✨ Key Features

1. **📈 Daily Price Updates** — Displays products with rising and falling prices so users can quickly identify market price changes.

2. **📂 Category-Based Filtering** — Browse products by category and easily find specific items.

3. **↕️ Price Sorting** — Sort products by price from low to high or high to low for convenient comparison.

4. **🔍 Product Search** — Find products quickly using the search functionality.

5. **📊 Detailed Price Information** — View product details, including minimum, maximum, average, and market-wise prices.

6. **🔐 Secure Authentication** — Supports email/password registration and login, along with Google and GitHub social authentication through Better Auth.

7. **👤 User Profile Management** — View profile information and update the user's name.

8. **🛡️ Protected Routes** — Restricts access to authenticated-only pages and redirects unauthenticated visitors to the sign-in page.

9. **⏳ Loading Skeletons** — Displays loading placeholders while product information is being fetched.

10. **🔔 Toast Notifications** — Provides feedback for authentication actions, validation errors, and other relevant events.

11. **📱 Fully Responsive Design** — Delivers a consistent experience across mobile, tablet, and desktop devices.

12. **🎨 Bengali User Interface** — Uses Bengali text and Bengali numerals for a localized user experience.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, routing, server rendering, and application structure |
| **React 19** | Component-based UI and interactive features |
| **TypeScript** | Type safety and maintainable code |
| **Tailwind CSS 4** | Responsive styling and utility-first design |
| **DaisyUI 5** | Reusable UI components and styling |
| **Better Auth** | Authentication, sessions, and social login |
| **PostgreSQL (`pg`)** | Optional persistent storage for users and sessions |
| **react-hot-toast** | Toast notifications and user feedback |
| **REST API** | Fetching product, category, and market price information |
| **Git & GitHub** | Version control and source code management |
| **Vercel** | Application deployment |

---

## 🗺️ Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Homepage with product listings, price changes, search, and categories |
| `/category/[slug]` | Public | Category-specific products and price sorting |
| `/product/[slug]` | Protected | Detailed product information and market-wise prices |
| `/signin` | Public | Email/password sign-in and social login |
| `/signup` | Public | New user registration |
| `/profile` | Protected | Displays signed-in user information |
| `/profile/edit` | Protected | Updates the user's profile information |
| `/api/auth/[...all]` | API | Handles Better Auth requests |

---

## 🔐 Authentication — Better Auth

The application uses **Better Auth** to manage user authentication and sessions.

### Authentication Features

- Email and password registration.
- Email and password sign-in.
- Google OAuth authentication.
- GitHub OAuth authentication.
- Session management.
- Protected pages for authenticated users.
- Profile information updates.
- Sign-out functionality.

### Authentication Flow

1. A new user registers with their name, email, and password.
2. The application creates the user's account.
3. The user is redirected to the sign-in page when automatic sign-in is disabled.
4. The user signs in using their registered credentials or an available social login provider.
5. Authenticated users can access protected pages and manage their profile.

### Important Authentication Files

| File | Responsibility |
|---|---|
| `src/lib/auth.ts` | Server-side Better Auth configuration |
| `src/lib/auth-client.ts` | Client-side authentication methods |
| `src/context/AuthContext.tsx` | Shared session state |
| `src/app/api/auth/[...all]/route.ts` | Better Auth API route handler |
| `src/proxy.ts` | Route protection and authentication redirects |

---

## ⚙️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/priyaahmed007/BazarPriceTracker.git
```

### 2. Navigate to the Project Directory

```bash
cd BazarPriceTracker
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Replace the placeholder values with your actual credentials. Keep your `.env` file private and never commit secrets to GitHub.

**Note:** Configure only the database variables required by your actual Better Auth adapter. If the project uses PostgreSQL, verify the corresponding database connection variable in your source code rather than assuming `MONGODB_URL` is used.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 Project Structure

```text
BazarPriceTracker/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...all]/
│   │   ├── category/
│   │   │   └── [slug]/
│   │   ├── product/
│   │   │   └── [slug]/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── profile/
│   │   │   └── edit/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   └── auth-client.ts
│   └── proxy.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

*Note: This is an illustrative structure based on the described features. Adjust the tree to match the actual files and folders in your repository.*

---



To deploy your own version, import the repository into Vercel, configure the required environment variables, and deploy the application.

---

## 👩‍💻 Author

**Priya Ahmed**

Frontend Developer | React.js | Next.js | TypeScript


## 💙 Acknowledgements

Built with modern web technologies to make everyday market price information easier to access for people in Bangladesh.

**Code. Create. Continue.**

⭐ If you find this project useful, consider giving the repository a star!
