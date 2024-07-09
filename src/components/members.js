import React, { useState, useEffect } from "react";

import requester from "../axios";
import MemberForm from "./memberForm";

export default function Members() {
  const [member, setMember] = useState();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    requester
      .get("/members")
      .then((response) => setMembers(response.data))
      .catch((error) => console.error("Erro ao buscar membros:", error));
  }, []);

  const addMember = ({ name, guildId }) => {
    const created = {
      name,
      guildId,
    };

    requester
      .post("/members", created)
      .then((response) => {
        setMembers([...members, response.data]);
        setMember(undefined);
      })
      .catch((error) => console.error("Erro ao adicionar membro:", error));
  };

  const editMember = ({ id, name, guildId }) => {
    const updated = {
      name,
      guildId,
    };

    requester
      .patch(`/members/${id}`, updated)
      .then((response) => {
        setMembers(
          members.map((member) => (member.id === id ? response.data : member))
        );
        setMember(undefined);
      })
      .catch((error) => console.error("Erro ao editar o membro:", error));
  };

  const deleteMember = ({ id }) => {
    requester
      .delete(`/members/${id}`)
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
    <main className="flex flex-col gap-4 p-5">
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