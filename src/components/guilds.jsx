import { useNavigate } from "react-router-dom";

export function Guilds() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1>Guildas</h1>
      <button onClick={() => navigate("idAqui")}>Editar</button>
    </div>
  );
}
