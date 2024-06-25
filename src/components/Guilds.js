// src/components/Guilds.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);

  const [name, setName] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8000/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  const addGuild = () => {
    const newGuild = { name };
    axios
      .post("http://localhost:8000/guilds", newGuild)
      .then((response) => {
        setGuilds([...guilds, response.data]);
        setName("");
      })
      .catch((error) => console.error("Erro ao adicionar categoria:", error));
  };

  return (
    <main>
      <h1>Guilds</h1>
      <ul>
        {guilds.map((guild) => (
          <li key={guild.id}>{guild.name}</li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          placeholder="Guilda"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addGuild}>Adicionar</button>
      </form>
    </main>
  );
}
