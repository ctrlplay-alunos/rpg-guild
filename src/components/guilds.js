import React, { useState, useEffect } from "react";

import requester from "../axios";
import GuildForm from "./guildForm";

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);

  const [guild, setGuild] = useState();

  useEffect(() => {
    const getGuilds = async () => {
      try {
        const response = await requester.get("/guilds");
        setGuilds(response.data);
      } catch (error) {
        console.error("Erro ao buscar as guildas:", error);
      }
    };

    getGuilds();
  }, []);

  const addGuild = async (guild) => {
    const { name } = guild;

    const created = { name };

    try {
      const response = await requester.post("/guilds", created);
      setGuilds([...guilds, response.data]);
      setGuild(undefined);
    } catch (error) {
      console.error("Erro ao adicionar a guilda:", error);
    }
  };

  const editGuild = async (guild) => {
    const { id, name } = guild;

    const updated = {
      name,
    };

    try {
      const response = await requester.patch(`/guilds/${id}`, updated);
      setGuilds(
        guilds.map((guild) => (guild.id === id ? response.data : guild))
      );
      setGuild(undefined);
    } catch (error) {
      console.error("Erro ao editar a guilda:", error);
    }
  };

  const deleteGuild = async ({ id }) => {
    try {
      await requester.delete(`/guilds/${id}`);
      setGuilds(guilds.filter((guild) => guild.id !== id));
      setGuild(undefined);
    } catch (error) {
      console.error("Erro ao deletar a guilda:", error);
    }
  };

  const onSubmit = guild ? editGuild : addGuild;

  const onClickGuild = (selected) => {
    if (guild?.id !== selected.id) setGuild(selected);
    else setGuild(undefined);
  };

  return (
    <main className="flex flex-col gap-4 p-5">
      <h1>Guildas</h1>
      <ul>
        {guilds.map((guild) => (
          <li
            key={guild.id}
            onClick={() => onClickGuild(guild)}
            className="cursor-pointer flex gap-4"
          >
            {guild.name}
            <button onClick={() => deleteGuild(guild)}>Excluir</button>
          </li>
        ))}
      </ul>
      <GuildForm onSubmit={onSubmit} guild={guild} />
    </main>
  );
}
