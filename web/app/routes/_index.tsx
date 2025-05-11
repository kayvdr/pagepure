import type { MetaFunction } from "@remix-run/node";
import Content from "~/components/Content";
import Converter from "~/components/Converter";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Container from "~/components/ui/Container";

export const meta: MetaFunction = () => [
  { title: "Pagepure" },
  { name: "description", content: "" },
];

const Index = () => (
  <>
    <Header />
    <main>
      <Container>
        <Content />
        <Converter />
        <Footer />
      </Container>
    </main>
  </>
);

export default Index;
