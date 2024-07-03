import { render, screen, expect } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);

  expect(screen.getByText("Bem vindo ao RPG Guild")).toBeInTheDocument();
});
