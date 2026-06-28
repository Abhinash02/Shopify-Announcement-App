Task 

## **Task: Shopify App** 

## **Step 1: Preparation** 

1. **Create a Partner Account:** Go to partners.shopify.com and sign up. 

2. **Create a Development Store:** Inside your Partner Dashboard, create a store to test your work. 

3. **Scaffold the App (Crucial):** Initialize the app as per documentation. 

## **Step 2: The Challenge (The App)** 

You need to build a system where data flows from: **Admin -> Database -> Shopify API -> Storefront** . 

## **1. The App Dashboard (React/Polaris)** 

- Create a simple page in the Shopify Admin. 

- Include a text input field: **"Announcement Text"** . 

- Include a "Save" button. 

## **2. The Backend & Database (Node/Express + MongoDB)** 

- When the user clicks "Save": 

   - **Save to Database:** Store the text and a timestamp in your **MongoDB** database (to maintain an audit history). 

   - **Sync to Shopify:** Your backend must use the Shopify Admin API (REST or GraphQL) to save this text into a **Shop Metafield** . 

   - _Hint:_ Use a namespace like my_app and a key like announcement . 

## **3. The Storefront (Theme App Extension)** 

- Run npm run shopify app generate extension and select **Theme App Extension** . 

- Create an **App Embed Block** (not a Section Block). This allows the banner to float on every page. 

- **The Logic:** In the extension's liquid file, read the text from the Shop Metafield you saved in step 2 and display it. 

   - _Hint:_ You will use Liquid code similar to: {{ 

      - shop.metafields.my_app.announcement }} . 

_Note: This is a confidential document not to be shared with anyone._ 

## **Task: Shopify App** 

## **Step 3: Technical Requirements** 

- **Stack:** MongoDB, Express, React, Node.js (MERN). 

- **Architecture:** Use the shop.metafields API to bridge the backend and frontend. **Do not** use ScriptTags (they are deprecated). 

- **Repo:** Push your code to a public GitHub repository. 

## **Step 4: Resources & Help** 

- **The Backend (Saving Data):** Shopify Node API - Metafields 

- **The Frontend (Displaying Data):** App Embed Blocks Guide 

- **The Bridge (Liquid):** Accessing Metafields in Liquid 

## **Submission Guidelines** 

Email us the following on careers@futureblinkmail.xyz with subject line “Shopity App Developer Task”. 

1. **Public GitHub Repository Link:** With a README.md on how to run it. 

2. Deployed Application: Use Render, Heroku, Linode, Vercel, Fly.io 

3. **A Short Video Demo (Loom/YouTube):** A 2-3 minute video showing: 

   - You typing a message in your App Dashboard (e.g., "Sale 50% Off") and clicking Save. 

   - **The Proof:** Showing the message appearing live on the "Online Store" preview. 

   - **The Database:** Showing the record saved in your MongoDB. 

**4. Your Updated Resume** 

_Note: This is a confidential document not to be shared with anyone._ 

