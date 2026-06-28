# Shopify Announcement Banner App - Setup & Run Instructions

This app is a custom Shopify application designed to allow merchants to publish a floating announcement banner (e.g., promotional text, notifications) onto their storefront from the Shopify Admin panel.

---

## What This App Does

1. **Merchant Dashboard (React / Polaris)**: A dashboard inside the Shopify Admin page where the merchant can type their announcement text and click "Publish".
2. **Backend & Database**:
   - Stores each announcement in a **MongoDB** database to keep a history of updates for audit logs.
   - Synchronizes the latest announcement to a **Shop Metafield** (`my_app.announcement`) on the Shopify merchant's store.
3. **Storefront (Liquid App Embed Block)**: A theme extension block that retrieves the metafield value and floats a banner at the top of the storefront dynamically.

---

## Prerequisites

Before running the application, make sure you have:
1. **Node.js** (v20+ recommended).
2. A **Shopify Partner Account** and a **Development Store** set up.
3. A **MongoDB Atlas** database connection string (or a local MongoDB running).

---

## Step 1: Clone or Unzip
Unzip the project archive into your preferred directory.

---

## Step 2: Install Dependencies
Open your terminal inside the project root directory and run:
```bash
npm install
```
*(This will install all required packages, including React Router frameworks, `@vercel/react-router` for Vercel builds, and the local `@shopify/cli` dependency.)*

---

## Step 3: Configure Environment Variables
Create a file named `.env` in the root of the project (if it doesn't already exist) and populate it with your credentials:

```env
# MongoDB Connection string
MONGO_URI="your-mongodb-atlas-connection-string"

# Shopify App credentials (retrieved from Shopify Partners -> your App)
SHOPIFY_API_KEY="your-shopify-api-key"
SHOPIFY_API_SECRET="your-shopify-api-secret"
```

---

## Step 4: Run the App Locally

To start the Shopify development server:
```bash
npm run dev
```

### When Running `dev` for the First Time:
1. The CLI will request you to authenticate. It will print a **User verification code** and open a login link in your browser.
2. Log in using your Shopify Partner account.
3. Once logged in, choose your Shopify Partner Organization and select your active **Development Store** to link the app.
4. The CLI will automatically build, establish tunnels, and create/link the app details in your Shopify Partners dashboard.

---

## Step 5: Enable the Banner on the Storefront

The storefront banner is injected via a **Theme App Extension**. To view it on your development store:
1. When running `npm run dev`, select your development store to preview.
2. In the terminal output, look for the **development store preview URL** and open it.
3. Go to the **Online Store -> Themes** section of your Shopify admin.
4. Click **Customize** on your active theme to open the Shopify Theme Editor.
5. In the left panel, click on **App Embeds** (represented by a small extension block icon).
6. Locate the **Announcement Banner** app embed block, toggle it **ON**, and configure your text and background colors if needed.
7. Click **Save** in the top right corner.
8. The announcement you set in the Admin dashboard will now float live at the top of your store page!

---

## Step 6: Deploying to Vercel
The app is fully compatible with serverless Vercel deployments:
1. Install the Vercel CLI (`npm i -g vercel`) or push the code to a GitHub repository linked to your Vercel account.
2. Set the following Environment Variables in your Vercel project dashboard:
   - `MONGO_URI`
   - `SHOPIFY_API_KEY`
   - `SHOPIFY_API_SECRET`
   - `SHOPIFY_APP_URL` (Points to your Vercel deployment URL, e.g., `https://your-app.vercel.app`)
3. Vercel will automatically detect the React Router v7 framework (via the configuration in `react-router.config.js`) and build the project serverless.
