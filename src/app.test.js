import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./app";

test("renders learn react link", async () => {
  render(<App />);

  expect(await screen.findByText("Bem vindo ao RPG Guild"));
});
