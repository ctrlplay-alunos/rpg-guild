// src/components/Categories.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  const addCategory = () => {
    const newCategory = { name };
    axios
      .post("http://localhost:8000/categories", newCategory)
      .then((response) => {
        setCategories([...categories, response.data]);
        setName("");
        
      })
      .catch((error) => console.error("Erro ao adicionar categoria:", error));
  };

  return (
    <main>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <form>
        <input
          type="text"
          placeholder="Categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <button onClick={addCategory}>Adicionar</button>
      </form>
    </main>
  );
}
