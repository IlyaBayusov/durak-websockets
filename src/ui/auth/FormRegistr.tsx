"use client";

import { RegistrResp } from "@/src/interfaces";
import { saveTokens } from "@/src/utils";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

interface IFormRegistr {
  username: string;
  password: string;
  secondPassword: string;
}

export default function FormRegistr() {
  const {
    formState: { isValid },
    register,
    handleSubmit,
    reset,
  } = useForm<IFormRegistr>();

  const onSubmit = async (formData: IFormRegistr) => {
    if (!isValid) {
      return; // ошибку вывести
    }

    try {
      const resp = await axios.post("http://localhost:4000/api/auth/register", {
        username: formData.username,
        password: formData.password,
      });
      const data: RegistrResp = resp.data;

      saveTokens(data.data.accessToken, data.data.refreshToken);
    } catch (error) {
      console.log("Ошибка входа", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="username"
        type="text"
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 30,
        })}
        className="border border-black"
      />
      <input
        placeholder="password"
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
          maxLength: 50,
        })}
        className="border border-black"
      />
      <input
        placeholder="secondPassword"
        type="password"
        {...register("secondPassword", {
          required: true,
          minLength: 8,
          maxLength: 50,
        })}
        className="border border-black"
      />

      <button className="border border-black">Зарегистрироваться</button>
    </form>
  );
}
