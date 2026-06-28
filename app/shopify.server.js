import "@shopify/shopify-app-react-router/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-react-router/server";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";

const shopify = shopifyApp({
<<<<<<< HEAD
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
=======
  apiKey: process.env.SHOPIFY_API_KEY || "3cc5989af5b0d2caa8d2364b134b291c",
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "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",
>>>>>>> ba075f0f9e90cbda1ef543c069138404758b6e99
  apiVersion: ApiVersion.October25,
  scopes: (process.env.SCOPES || "write_products,write_metaobjects,write_metaobject_definitions").split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "https://shopify-announcement.vercel.app",
  authPathPrefix: "/auth",
  sessionStorage: new MongoDBSessionStorage(
<<<<<<< HEAD
    process.env.MONGO_URI || "mongodb://localhost:27017/announcement_app",
=======
    process.env.MONGO_URI || "mongodb+srv://abhinash:abhinash@cluster0.kvut8us.mongodb.net/announcement_app?retryWrites=true&w=majority&appName=Cluster0",
>>>>>>> ba075f0f9e90cbda1ef543c069138404758b6e99
    "announcement_app"
  ),
  distribution: AppDistribution.AppStore,
  future: {
    expiringOfflineAccessTokens: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October25;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
