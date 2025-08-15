import { Header } from "./header/component";
import { Footer } from "./footer/component";
import { Body } from "./body/component";

export function Mobile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Body />
      </main>
      <Footer />
    </div>
  );
}
