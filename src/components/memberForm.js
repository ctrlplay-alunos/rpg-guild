import React, { useState, useEffect } from "react";

import requester from "../axios";

function MemberForm(props) {
  const { member: value, onSubmit } = props;

  const [member, setMember] = useState({
    id: 0,
    name: "",
    guildId: 0,
  });

  const [guilds, setGuilds] = useState([]);

  useEffect(
    () =>
      setMember(
        value ?? {
          id: 0,
          name: "",
          guildId: 0,
        }
      ),
    [value]
  );

  useEffect(() => {
    requester
      .get("/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(member);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label>Membro</label>
        <input
          name="name"
          type="text"
          defaultValue={member?.name}
          onChange={(e) =>
            setMember((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Guilda</label>
        <select
          value={member?.guildId ?? 0}
          name="guild"
          placeholder="Guilda"
          onChange={(e) =>
            setMember((prev) => ({ ...prev, guildId: e.target.value }))
          }
        >
          <option value="" />
          {guilds.map((guild) => (
            <option key={guild.id} value={guild.id}>
              {guild.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default MemberForm;
