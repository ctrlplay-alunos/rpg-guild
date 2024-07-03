import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Members() {
  const [member, setMember] = useState();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/members")
      .then((response) => setMembers(response.data))
      .catch((error) => console.error("Erro ao buscar membros:", error));
  }, []);

  const addMember = ({ name, categoryId, guildId }) => {
    const newMember = {
      name,
      categoryId,
      guildId,
    };
    axios
      .post("http://localhost:8000/members", newMember)
      .then((response) => {
        setMembers([...members, response.data]);
        setMember(undefined);
      })
      .catch((error) => console.error("Erro ao adicionar membro:", error));
  };

  const editMember = ({ id, name, categoryId, guildId }) => {
    const updatedMember = {
      name,
      categoryId,
      guildId,
    };
    axios
      .patch(`http://localhost:8000/members/${id}`, updatedMember)
      .then((response) => {
        setMembers(
          members.map((member) => (member.id === id ? response.data : member))
        );
        setMember(undefined);
      })
      .catch((error) => console.error("Erro ao editar o membro:", error));
  };

  const deleteMember = ({ id }) => {
    axios
      .delete(`http://localhost:8000/members/${id}`)
      .then(() => {
        setMembers(members.filter((member) => member.id !== id));
        setMember(undefined);
      })
      .catch((error) => console.error("Erro ao deletar o membro:", error));
  };

  const onSubmit = member ? editMember : addMember;

  const onClickMember = (selected) => {
    if (member?.id !== selected.id) setMember(selected);
    else setMember(undefined);
  };

  return (
    <main>
      <h1>Membros</h1>
      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            onClick={() => onClickMember(member)}
            className="cursor-pointer flex gap-4"
          >
            {member.name}
            <button onClick={() => deleteMember(member)}>Excluir</button>
          </li>
        ))}
      </ul>
      <MemberForm member={member} onSubmit={onSubmit} />
    </main>
  );
}

function MemberForm(props) {
  const { member: value, onSubmit } = props;

  const [member, setMember] = useState({
    id: 0,
    name: "",
    categoryId: 0,
    guildId: 0,
  });

  const [categories, setCategories] = useState([]);
  const [guilds, setGuilds] = useState([]);

  useEffect(
    () =>
      setMember(
        value ?? {
          id: 0,
          name: "",
          categoryId: 0,
          guildId: 0,
        }
      ),
    [value]
  );

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/guilds")
      .then((response) => setGuilds(response.data))
      .catch((error) => console.error("Erro ao buscar as guildas:", error));
  }, []);

  return (
    <form>
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
        <label>Membro</label>
        <select
          value={member?.categoryId ?? 0}
          name="category"
          placeholder="Categoria"
          onChange={(e) =>
            setMember((prev) => ({ ...prev, categoryId: e.target.value }))
          }
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
      <button onClick={() => onSubmit(member)}>Adicionar</button>
    </form>
  );
}
