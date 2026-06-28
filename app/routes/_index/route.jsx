import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.index}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Announcement Banner App</h1>
          <p className={styles.text}>
            Boost your sales and keep your customers informed with beautiful, customizable announcement banners across your store.
          </p>
        </div>

        {showForm && (
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Install or Log in</h2>
            <Form className={styles.form} method="post" action="/auth/login">
              <label className={styles.label}>
                <span className={styles.labelText}>Shop domain</span>
                <input 
                  className={styles.input} 
                  type="text" 
                  name="shop" 
                  placeholder="the-challenge-c8tkwma3.myshopify.com"
                />
                <span className={styles.helpText}>Copy and Enter this URL the-challenge-c8tkwma3.myshopify.com</span>
              </label>
              <button className={styles.button} type="submit">
                Log in to App
              </button>
            </Form>
          </div>
        )}

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>🎨 Fully Customizable</h3>
            <p>Design your banner to match your brand's unique style perfectly.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>🚀 Instant Publish</h3>
            <p>Update your announcements in real-time across your entire store.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>📱 Mobile Ready</h3>
            <p>Looks great on any device, ensuring all your customers see your message.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
