import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { expect, it, describe } from "vitest";

describe("Contact Component", () => {
  it("deve renderizar o título do formulário de orçamento", () => {
    render(
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    );

    const title = screen.getByRole("heading", { 
      level: 3, 
      name: /Solicite seu orçamento/i 
    });
    
    expect(title).toBeInTheDocument();
  });
});