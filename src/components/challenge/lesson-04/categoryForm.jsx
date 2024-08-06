import { useState } from "react";

import requester from "../axios";

export function CategoryForm(props) {

  const [category, setCategory] = useState();

  const addCategory = async (category) => {
    const { name } = category;

    const created = { name };

    try {
      const response = await requester.post("/caregories", created);
      props.updateCaregories?.(response.data);
    } catch (error) {
      console.error("Erro ao adicionar a categoria:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(category);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-500">
      <div className="flex flex-col gap-1">
        <label>Categoria</label>
        <input
          name="name"
          type="text"
          defaultValue={category?.name}
          onChange={(e) =>
            setCategory((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <button type="submit" className="w-fit">Confirmar</button>
    </form>
  );
}
