import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GuildForm } from "./guildForm";

export function Guilds() {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);

  const updateGuilds = (data) => setGuilds([...guilds, data]);

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1>Guildas</h1>
      <ul>
        {guilds.map((guild) => (
          <li key={guild.id} className="cursor-pointer flex gap-4 items-center">
            {guild.name}
            <button onClick={() => navigate(guild.id)}>Editar</button>
          </li>
        ))}
      </ul>
      <GuildForm updateGuilds={updateGuilds} />
    </div>
  );
}
