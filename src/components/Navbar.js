// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='flex w-full gap-5 h-[65px] items-center bg-[#E9E0D5] p-5'>
      <h1 className='text-xl'>RPG Guild</h1>
      <ul className='flex gap-5'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/guilds">Guildas</Link></li>
        <li><Link to="/members">Membros</Link></li>
        <li><Link to="/categories">Categorias</Link></li>
      </ul>
    </nav>
  );
}
