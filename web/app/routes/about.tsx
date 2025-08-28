import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Container from "~/components/ui/Container";

export const meta: MetaFunction = () => [
  { title: "About | Pagepure" },
  { name: "description", content: "" },
];

const About = () => (
  <>
    <Header />
    <main>
      <Container>
        <h1>About us</h1>
        <p>
          Our website helps you save time and stay focused. Instead of scrolling
          endlessly through a page, we fetch the content for you, filter out the
          most important topics, and present them in a clear, easy-to-read
          format.
        </p>
        <p>
          Whether it’s articles, news, or long-form texts – we focus on what
          truly matters:
        </p>
        <ul>
          <li>Key insights instead of distractions</li>
          <li>Topic overviews instead of walls of text</li>
          <li>Quick access to relevant information</li>
        </ul>
        <p>
          Our mission is simple: deliver the information that really counts –
          compact, structured, and easy to understand.
        </p>
        <Footer />
      </Container>
    </main>
  </>
);

export default About;
