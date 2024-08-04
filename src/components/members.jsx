import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MemberForm } from "./memberForm";

export function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  const updateMembers = (data) => setMembers([...members, data]);

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1>Membros</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="cursor-pointer flex gap-4 items-center">
            {member.name}
            <button onClick={() => navigate(member.id)}>Editar</button>
          </li>
        ))}
      </ul>
      <MemberForm updateMembers={updateMembers} />
    </div>
  );
}
