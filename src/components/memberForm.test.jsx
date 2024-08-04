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

describe("MemberForm tests", () => {
  beforeEach(() => {
    requester.get.mockResolvedValue({
      data: guilds,
    });
  });

  it("should create a new member", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ memberId: undefined });

    const updateMembers = jest.fn();

    render(<MemberForm updateMembers={updateMembers} />);

    await waitFor(() => expect(requester.get).toHaveBeenCalledWith("/guilds"));

    const input = screen.getByRole("input");

    fireEvent.change(input, {
      target: { value: "Selene Nightingale" },
    });

    expect(input).toHaveValue("Selene Nightingale");

    const select = screen.getByRole("select");

    fireEvent.change(select, { target: { value: "325c" } });

    expect(select).toHaveValue("325c");

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(requester.post).toHaveBeenCalledWith("/members", {
        name: "Selene Nightingale",
        guildId: "325c",
      })
    );

    expect(updateMembers).toHaveBeenCalled();
  });

  it("should edit an existing member", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ memberId: member.id });

    requester.get.mockResolvedValueOnce({
      data: member,
    });

    render(<MemberForm />);

    await waitFor(() =>
      expect(requester.get).toHaveBeenCalledWith("/members/7eb4")
    );

    await waitFor(() => expect(requester.get).toHaveBeenCalledWith("/guilds"));

    const input = screen.getByRole("input");

    const select = screen.getByRole("select");

    expect(input).toHaveValue("Selene Nightingale");

    expect(select).toHaveValue("325c");

    fireEvent.change(input, {
      target: { value: "Selene Night" },
    });

    expect(input).toHaveValue("Selene Night");

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() =>
      expect(requester.patch).toHaveBeenCalledWith("/members/7eb4", {
        name: "Selene Night",
        guildId: "325c",
      })
    );
  });
});
