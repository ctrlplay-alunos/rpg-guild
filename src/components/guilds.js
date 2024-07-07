import React, { useState, useEffect } from "react";
import requester from "../axios";

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);

  const [guild, setGuild] = useState();

  useEffect(() => {
    requester
      .get("/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  const addGuild = (guild) => {
    const { name } = guild;

    const created = { name };

    requester
      .post("/guilds", created)
      .then((response) => {
        setGuilds([...guilds, response.data]);
        setGuild(undefined);
      })
      .catch((error) => console.error("Erro ao adicionar a guilda:", error));
  };

  const editGuild = (guild) => {
    const { id, name } = guild;

    const updated = {
      name,
    };

    requester
      .patch(`/guilds/${id}`, updated)
      .then((response) => {
        setGuilds(
          guilds.map((guild) => (guild.id === id ? response.data : guild))
        );
        setGuild(undefined);
      })
      .catch((error) => console.error("Erro ao editar a guilda:", error));
  };

  const deleteGuild = ({ id }) => {
    requester
      .delete(`/guilds/${id}`)
      .then(() => {
        setGuilds(guilds.filter((guild) => guild.id !== id));
        setGuild(undefined);
      })
      .catch((error) => console.error("Erro ao deletar a guilda:", error));
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

function GuildForm(props) {
  const { guild: value, onSubmit } = props;

  const [guild, setGuild] = useState({ id: 0, name: "" });

  useEffect(() => setGuild(value ?? { id: 0, name: "" }), [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(guild);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label>Guilda</label>
        <input
          name="name"
          type="text"
          defaultValue={guild?.name}
          onChange={(e) =>
            setGuild((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <button type="submit">Confirmar</button>
    </form>
  );
}
