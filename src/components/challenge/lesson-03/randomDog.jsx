import React, { useState, useEffect } from "react";
import axios from "axios";

export function RandomDog() {
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDog = () => {
    setLoading(true);
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        console.log(response);
        setDogImage(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => getDog(), []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao buscar imagem: {error}</p>;

  return (
    <div>
      <img
        src={dogImage}
        alt="Cachorro Aleatório"
        className="w-[300px] h-[300px] object-cover"
      />
      <br />
      <button onClick={getDog}>Carregar Nova Imagem</button>
    </div>
  );
}
