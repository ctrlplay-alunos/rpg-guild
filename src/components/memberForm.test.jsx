import { describe, test, expect } from "@jest/globals";
import Router from "react-router-dom";

import { render, waitFor, screen, fireEvent } from "../testUtils";
import { MemberForm } from "./memberForm";

import requester from "../axios";

jest.mock("../axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

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
    jest.spyOn(Router, "useParams").mockReturnValue({ memberId: undefined });

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

    await waitFor(() =>
      expect(requester.post).toHaveBeenCalledWith("/members", {
        name: "Selene Nightingale",
        guildId: "325c",
      })
    );
  });

  test("edit member", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ memberId: "7eb4" });

    requester.get.mockResolvedValueOnce({
      data: member,
    });

    render(<MemberForm onSubmit={onSubmit} />);

    await waitFor(() =>
      expect(requester.get).toHaveBeenCalledWith("/members/7eb4")
    );

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

    await waitFor(() =>
      expect(requester.patch).toHaveBeenCalledWith("/members/7eb4", {
        name: "Selene Night",
        guildId: "325c",
      })
    );
  });
});
