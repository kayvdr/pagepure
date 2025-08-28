import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Container from "~/components/ui/Container";

export const meta: MetaFunction = () => [
  { title: "Privacy | Pagepure" },
  { name: "description", content: "" },
];

const Privacy = () => (
  <>
    <Header />
    <main>
      <Container>
        <h1>Privacy Policy</h1>
        <p>
          Protecting your personal data is important to us. This Privacy Policy
          explains what information we collect, how we use it, and what rights
          you have.
        </p>
        <h2>1. Data Controller</h2>
        <p>
          The party responsible for data processing is:
          <br />
          [Your Name / Company Name]
          <br />
          [Address]
          <br />
          [Contact Email]
        </p>
        <h2>2. Information We Collect</h2>
        <p>
          Automatically collected data: When you visit our website, technical
          information such as your IP address, browser type, date, and time of
          access may be recorded.
        </p>
        <p>
          Data you provide: When you contact us, we store the information you
          voluntarily provide (e.g., your email address).
        </p>
        <h2>3. Purpose of Processing</h2>
        <p>We process your data only for the following purposes:</p>
        <ul>
          <li>Operating and improving our website and services</li>
          <li>Responding to inquiries</li>
          <li>Ensuring security and preventing misuse</li>
        </ul>
        <h2>4. Sharing with Third Parties</h2>
        <p>
          We do not share your personal data with third parties unless required
          by law or necessary to operate our services (e.g., hosting providers).
        </p>
        <h2>5. Data Retention and Deletion</h2>
        <p>
          We store personal data only as long as necessary to provide our
          services or as required by law. After that, the data will be deleted.
        </p>
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Restrict processing of your data</li>
          <li>Object to data processing</li>
          <li>Request data portability</li>
          <li>
            To exercise these rights, please contact us at [Your Contact Email].
          </li>
        </ul>
        <h2>7. Security</h2>
        <p>
          We use technical and organizational measures to protect your data from
          loss, misuse, or unauthorized access.
        </p>
        <h2>8. Changes to this Privacy Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy when necessary. The
          current version will always be available on our website.
        </p>
        <Footer />
      </Container>
    </main>
  </>
);

export default Privacy;
