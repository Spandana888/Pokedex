import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../Header/Header"

describe("Header" , () =>{
    test("Header componenets contains title" , () =>{
        render(<Header />);
        const header = screen.getByTestId("app-header");
        expect(header).not.toBeEmptyDOMElement();
    });
    test("Header componenets contains title", () => {
      render(<Header />);
      const headerText  = screen.getByTestId("app-header");
      expect(headerText).toHaveTextContent("Pokédex");
    });
    test("Header componenets contains subtext", () => {
      render(<Header />);
      const subtext = screen.getByTestId("app-subtext");
      expect(subtext).not.toBeEmptyDOMElement();
    });
    test("Header componenets contains subtext", () => {
      render(<Header />);
      const subtext = screen.getByTestId("app-subtext");
      expect(subtext).toHaveTextContent("Search for any Pokémon that exists on the planet");
    });
    test("Header componenets contains search", () => {
       render(<Header />);
       const searchbar = screen.getByTestId("app-search");
       expect(searchbar).not.toBeEmptyDOMElement();
    });
    test("Header componenets contains form", () => {
       render(<Header />);
       const searchform = screen.getByRole("form");
       expect(searchform).not.toBeEmptyDOMElement();
    });
    test("Header componenets contains form", () => {
      render(<Header />);
      const placeholder = screen.getByPlaceholderText(/Name or Number/i)
      expect(placeholder).toHaveAttribute("type", "text");
      expect(placeholder).toHaveAttribute("id", "search-text");
    });
})
