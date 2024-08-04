import { useParams } from "react-router-dom";

export function GuildForm(props) {
  const { guildId } = useParams();

  return (
    <form className="flex flex-col gap-4 text-orange-500">
      Guilda {guildId}
    </form>
  );
}
