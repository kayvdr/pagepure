import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Container from "~/components/ui/Container";

export const meta: MetaFunction = () => [
  { title: "Terms of Service | Pagepure" },
  { name: "description", content: "" },
];

const TermsOfService = () => (
  <>
    <Header />
    <main>
      <Container>
        <h1>Terms of Service</h1>
        <p>
          Welcome to our website!
          <br />
          Please read the following terms carefully before using our service.
        </p>
        <h2>1. Scope </h2>
        <p>
          By using our website, you agree to these Terms of Service. If you do
          not agree, please do not use our service.
        </p>
        <h2>2. Our Service</h2>
        <p>
          Our website retrieves content from external URLs, filters the most
          important information, and presents it in a simplified format.
          <br />
          We do not guarantee the completeness, accuracy, or timeliness of the
          content.
        </p>
        <h2>3. User Responsibilities</h2>
        <p>
          You are solely responsible for how you use the displayed information.
        </p>
        <p>Do not use the service for illegal purposes or to cause harm.</p>
        <h2>4. Copyright</h2>
        <p>
          All rights to the original content remain with the respective
          providers/authors. We only provide a simplified representation and
          claim no ownership of the content.
        </p>
        <h2>5. Disclaimer of Liability</h2>
        <p>
          We are not liable for any damages resulting from the use of, or
          inability to use, our service.
        </p>
        <h2>6. Changes</h2>
        <p>
          We reserve the right to update or modify these Terms of Service at any
          time. Significant changes will be announced on our website.
        </p>
        <h2>7. Contact</h2>
        <p>
          If you have any questions regarding these Terms of Service, please
          contact us at: [Your Contact Address]
        </p>
        <Footer />
      </Container>
    </main>
  </>
);

export default TermsOfService;
