import { render, screen } from "../testUtils";
import { Navbar } from "./navbar";

test("Navbar contains correct links", () => {
  render(<Navbar />);

  const homeLink = screen.getByText("Home");
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  const guildsLink = screen.getByText("Guildas");
  expect(guildsLink).toBeInTheDocument();
  expect(guildsLink).toHaveAttribute("href", "/guilds");

  const membersLink = screen.getByText("Membros");
  expect(membersLink).toBeInTheDocument();
  expect(membersLink).toHaveAttribute("href", "/members");
});