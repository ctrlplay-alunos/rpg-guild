import React from "react";

import { render, waitFor, screen, fireEvent } from "../testUtils";
import MemberForm from "./memberForm";

import requester from "../axios";

jest.mock("../axios");

const guilds = [
  {
    id: "325c",
    name: "Legião dos Dragões",
  },
];

const member = {
  id: "7eb4",
  name: "Selene Nightingale",
  guildId: "325c",
};

describe("member form test", () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    requester.get.mockResolvedValue({
      data: guilds,
    });
  });

  test("create member", async () => {
    render(<MemberForm onSubmit={onSubmit} />);

    await waitFor(() => expect(requester.get).toHaveBeenCalledWith("/guilds"));

    const nameInput = screen.getByTestId("nameInput");

    fireEvent.change(nameInput, {
      target: { value: "Selene Nightingale" },
    });

    expect(nameInput).toHaveValue("Selene Nightingale");

    const guildSelect = screen.getByTestId("guildSelect");

    fireEvent.change(guildSelect, { target: { value: "325c" } });

    expect(guildSelect).toHaveValue("325c");

    fireEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Selene Nightingale",
      guildId: "325c",
    });
  });

  test("edit member", async() => {
    render(<MemberForm onSubmit={onSubmit} member={member}/>);

    await waitFor(() => expect(requester.get).toHaveBeenCalledWith("/guilds"));

    const nameInput = screen.getByTestId("nameInput");

    const guildSelect = screen.getByTestId("guildSelect");

    expect(nameInput).toHaveValue("Selene Nightingale");

    expect(guildSelect).toHaveValue("325c");

    fireEvent.change(nameInput, {
      target: { value: "Selene Night" },
    });

    expect(nameInput).toHaveValue("Selene Night");

    fireEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "7eb4",
      name: "Selene Night",
      guildId: "325c",
    });
  });
});
