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
});
