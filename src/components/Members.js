// src/components/Members.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [guilds, setGuilds] = useState([]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [guildId, setGuildId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/members")
      .then((response) => setMembers(response.data))
      .catch((error) => console.error("Erro ao buscar membros:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  const addMember = () => {
    const newMember = {
      name,
      categoryId: parseInt(categoryId),
      guildId: parseInt(guildId),
    };
    axios
      .post("http://localhost:8000/members", newMember)
      .then((response) => {
        setMembers([...members, response.data]);
        setName("");
        setCategoryId("");
      })
      .catch((error) => console.error("Erro ao adicionar membro:", error));
  };

  return (
    <main>
      <h1>Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
      <form>
        <div className="flex flex-col gap-1">
          <label>Membro</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Membro</label>
          <select
            placeholder="Categoria"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" />
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label>Guilda</label>
          <select
            placeholder="Guilda"
            onChange={(e) => setGuildId(e.target.value)}
          >
            <option value="" />
            {guilds.map((guild) => (
              <option key={guild.id} value={guild.id}>
                {guild.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addMember}>Adicionar</button>
      </form>
    </main>
  );
}
