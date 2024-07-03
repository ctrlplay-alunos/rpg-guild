import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  const addCategory = ({ category }) => {
    const newCategory = { category };
    axios
      .post("http://localhost:8000/categories", newCategory)
      .then((response) => {
        setCategories([...categories, response.data]);
        setCategory(undefined);
      })
      .catch((error) => console.error("Erro ao adicionar categoria:", error));
  };

  const editCategory = ({ id, name }) => {
    const updatedCategory = {
      name,
    };
    axios
      .patch(`http://localhost:8000/categories/${id}`, updatedCategory)
      .then((response) => {
        setCategories(
          category.map((category) =>
            category.id === id ?  response.data  : category
          )
        );
        setCategory(undefined);
      })
      .catch((error) => console.error("Erro ao editar a categoria:", error));
  };

  const onSubmit = category ? editCategory : addCategory;

  const onClickCategory = (selected) => {
    if (category?.id !== selected.id) setCategory(selected);
    else setCategory(undefined);
  };

  return (
    <main>
      <h1>Categorias</h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onClickCategory(category)}
            className="cursor-pointer"
          >
            {category.name}
          </li>
        ))}
      </ul>

      <CategoryForm onSubmit={onSubmit} category={category} />
    </main>
  );
}

function CategoryForm(props) {
  const { category: value, onSubmit } = props;

  const [category, setCategory] = useState({ id: 0, name: "" });

  useEffect(() => setCategory(value ?? { id: 0, name: "" }), [value]);

  return (
    <form>
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

      <button onClick={() => onSubmit(category)}>Adicionar</button>
    </form>
  );
}
