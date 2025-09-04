"use client";

import { api } from "@/src/axios";
import { RegistrResp } from "@/src/interfaces";
import { saveTokens } from "@/src/utils";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const onSubmit = async (formData: IFormRegistr) => {
    try {
      const response = await api.post("/auth/register", {
        username: formData.username,
        password: formData.password,
      });
      const data: RegistrResp = response.data;

      if (!data) {
        throw new Error("Ошибка регистрации, нет data");
      }
      const respTokens = saveTokens(
        data.data.accessToken,
        data.data.refreshToken
      );

      if (respTokens) {
        router.push("/");
      } else {
        throw new Error("Ошибка сохранения токенов");
      }
    } catch (error) {
      console.error(error);
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

      <button type="submit" className="border border-black">
        Зарегистрироваться
      </button>
    </form>
  );
}
