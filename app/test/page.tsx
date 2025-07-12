"use client";

import React from "react";
import axios from "axios";

type Props = {};

export default function Test({}: Props) {
  const test = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/api/ping");

      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" />
        <button type="submit">Подключиться</button>
      </form>
    </div>
  );
}
