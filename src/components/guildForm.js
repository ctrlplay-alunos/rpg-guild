import React, { useState, useEffect } from "react";

function GuildForm(props) {
  const { guild: value, onSubmit } = props;

  const [guild, setGuild] = useState({ name: "" });

  useEffect(() => setGuild(value ?? guild), [value]);

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

export default GuildForm;
