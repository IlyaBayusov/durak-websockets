"use client";

import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

interface IFormAuth {
  username: string;
  password: string;
}

export default function FormAuth({}: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<IFormAuth>();

  const onSubmit = async (formData: IFormAuth) => {};

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

      <button type="submit" className="border border-black">
        Авторизоваться
      </button>
    </form>
  );
}
