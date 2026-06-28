# Shopify Announcement Banner App

This is a full-stack Shopify App built using the MERN stack (MongoDB, Express/Remix, React, Node.js) as part of the Shopify App Developer Task.

## Features
- **App Dashboard**: A React frontend integrated directly into the Shopify Admin to configure the announcement banner.
- **Database Audit**: Every time an announcement is saved, the text and a timestamp are stored in MongoDB.
- **Storefront Sync**: The app uses the Shopify GraphQL Admin API to sync the saved text directly to the shop's Metafields (`my_app.announcement`).
- **Theme App Extension**: Features an App Embed Block that dynamically reads the shop Metafield and displays a floating banner on the storefront.

## Tech Stack
- **Frontend**: React (Shopify App Bridge)
- **Backend**: Node.js (Shopify Remix template)
- **Database**: MongoDB (Mongoose)
- **Storefront**: Shopify Liquid (Theme App Extension)

## Prerequisites
- Node.js (v18+)
- A Shopify Partner Account & Development Store
- Shopify CLI installed globally (`npm install -g @shopify/cli`)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd announcement-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.kvut8us.mongodb.net/announcement_app
   ```

4. **Connect to your Shopify Dev Store:**
   ```bash
   npm run dev
   ```
   Follow the CLI prompts to connect the app to your development store.

## How to Test

1. Open the App in your Shopify Admin.
2. Enter your desired announcement text (e.g., "Sale 50% Off") and click **Publish to Storefront**.
3. Go to your MongoDB Atlas dashboard to verify that the record and timestamp were successfully saved.
4. In your Shopify Admin, navigate to **Online Store > Themes > Customize**.
5. Click on the **App Embeds** icon on the left sidebar and enable the **Announcement Banner**.
6. View your live storefront to see the floating banner!

## Architecture Details
- The connection between the Admin and the Storefront relies entirely on the `shop.metafields` API. No deprecated ScriptTags were used.
- The Theme App Extension uses a `"target": "body"` configuration to act as an App Embed Block, ensuring it floats natively on all pages without requiring theme code edits.
