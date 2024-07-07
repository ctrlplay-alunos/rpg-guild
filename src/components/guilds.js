import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);

  const [guild, setGuild] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  const addGuild = ({ name }) => {
    const created = { name };
    axios
      .post("http://localhost:8000/guilds", created)
      .then((response) => {
        setGuilds([...guilds, response.data]);
        setGuild();
      })
      .catch((error) => console.error("Erro ao adicionar a guilda:", error));
  };

  const editGuild = ({ id, name }) => {
    const updated = {
      name,
    };
    axios
      .patch(`http://localhost:8000/guilds/${id}`, updated)
      .then((response) => {
        setGuilds(
          guilds.map((guild) => (guild.id === id ? response.data : guild))
        );
        setGuild(undefined);
      })
      .catch((error) => console.error("Erro ao editar a guilda:", error));
  };

  const onSubmit = guild ? editGuild : addGuild;

  const onClickGuild = (selected) => {
    if (guild?.id !== selected.id) setGuild(selected);
    else setGuild(undefined);
  };

  return (
    <main className='flex flex-col gap-4 p-5'>
      <h1>Guildas</h1>
      <ul>
        {guilds.map((guild) => (
          <li
            key={guild.id}
            onClick={() => onClickGuild(guild)}
            className="cursor-pointer"
          >
            {guild.name}
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

  return (
    <form>
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

      <button onClick={() => onSubmit(guild)}>Confirmar</button>
    </form>
  );
}
