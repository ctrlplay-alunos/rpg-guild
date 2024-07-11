import { describe, test, expect } from "@jest/globals";

import { render, screen } from "../testUtils";
import { Navbar } from "./navbar";

describe("navbar test", () => {
  test("links", () => {
    render(<Navbar />);

    expect(screen.getByText("Home")).toHaveAttribute("href", "/");

    expect(screen.getByText("Guildas")).toHaveAttribute("href", "/guilds");

    expect(screen.getByText("Membros")).toHaveAttribute("href", "/members");
  });
});
