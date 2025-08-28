import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Container from "~/components/ui/Container";

export const meta: MetaFunction = () => [
  { title: "Faq | Pagepure" },
  { name: "description", content: "" },
];

const Faq = () => (
  <>
    <Header />
    <main>
      <Container>
        <h1>Faq</h1>
        <p>Coming soon...</p>
        <Footer />
      </Container>
    </main>
  </>
);

export default Faq;
