import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { connectToDB, Announcement } from "../db.mongoose";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  try {
    const response = await admin.graphql(`
      #graphql
      query {
        shop {
          metafield(namespace: "my_app", key: "announcement") {
            value
          }
        }
      }
    `);
    const shopData = await response.json();
    const announcementText = shopData.data?.shop?.metafield?.value || "";
    return { announcementText };
  } catch (error) {
    console.error("Error loading announcement metafield:", error);
    return { announcementText: "" };
  }
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const formData = await request.formData();
  const announcementText = formData.get("announcementText");

  // 1. Save to MongoDB
  await connectToDB();
  await Announcement.create({
    text: announcementText,
    shop: session.shop
  });

  // 2. Sync to Shopify Metafields
  // First, get the Shop ID
  const shopQuery = await admin.graphql(`
    #graphql
    query {
      shop {
        id
      }
    }
  `);
  const shopData = await shopQuery.json();
  const shopId = shopData.data.shop.id;

  // Then set the Metafield
  const metafieldResponse = await admin.graphql(
    `#graphql
    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        metafields: [
          {
            key: "announcement",
            namespace: "my_app",
            ownerId: shopId,
            type: "single_line_text_field",
            value: announcementText,
          },
        ],
      },
    }
  );

  const metafieldData = await metafieldResponse.json();
  const userErrors = metafieldData.data?.metafieldsSet?.userErrors;
  if (userErrors && userErrors.length > 0) {
    console.error("Metafield sync errors:", userErrors);
    return { success: false, errors: userErrors };
  }

  return { success: true, text: announcementText };
};

export default function Index() {
  const { announcementText } = useLoaderData();
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading = fetcher.state === "submitting" || fetcher.state === "loading";

  // State to hold the text the user types
  const [announcement, setAnnouncement] = useState(announcementText || "");

  // Keep state in sync with updated loader data
  useEffect(() => {
    if (announcementText !== undefined) {
      setAnnouncement(announcementText);
    }
  }, [announcementText]);

  useEffect(() => {
    if (fetcher.data?.success) {
      shopify.toast.show("Announcement saved!");
    }
  }, [fetcher.data, shopify]);

  const handleSave = () => {
    // Send the text to the backend
    fetcher.submit(
      { announcementText: announcement },
      { method: "POST" }
    );
  };

  return (
    <s-page heading="📢 Announcement Banner Dashboard">
      <s-section heading="Configure your live store banner">
        <div style={{ backgroundColor: '#f4f6f8', border: '1px solid #dfe3e8', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <s-stack direction="block" gap="base">
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#202223' }}>
              Storefront Announcement Text
            </h2>
            <p style={{ margin: '0 0 16px 0', color: '#6d7175', fontSize: '14px' }}>
              This text will float at the top of every page on your live store. Keep it short and impactful!
            </p>
            
            {/* The Text Input */}
            <input 
              type="text" 
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="e.g. 🚀 Mega Summer Sale: 50% Off Everything!"
              style={{ 
                width: "100%", 
                padding: "14px", 
                borderRadius: "8px", 
                border: "1px solid #c9cccf",
                fontSize: "16px",
                marginBottom: "20px",
                boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
            />

            {/* The Save Button */}
            <s-button
              onClick={handleSave}
              variant="primary"
              {...(isLoading ? { loading: true } : {})}
            >
              Publish to Storefront
            </s-button>
          </s-stack>
        </div>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
