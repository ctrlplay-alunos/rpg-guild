import { useState, useEffect } from "react";

import requester from "../axios";
import { CategoryForm } from "./categoryForm";

export function Categories() {
  const [category, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await requester.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar as categorias:", error);
      }
    };

    getCategories();
  }, []);

  const deleteCategory = async ({ id }) => {
    try {
      await requester.delete(`/categories/${id}`);
      setCategories(category.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Erro ao deletar a categoria:", error);
    }
  };

  const updateCategories = (data) => setCategories([...category, data]);

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1>Categorias</h1>
      <ul>
        {category.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer flex gap-4 items-center"
          >
            {category.name}

            <button onClick={() => deleteCategory(category)}>Excluir</button>
          </li>
        ))}
      </ul>
      <CategoryForm updateCategories={updateCategories} />
    </div>
  );
}
