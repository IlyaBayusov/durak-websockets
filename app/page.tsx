"use client";

import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { userSlice } from "@/src/stores/reducers/UserSlice";

export default function Home() {
  const { users, count } = useAppSelector((state) => state.userReducer);

  const { inc } = userSlice.actions;
  const dispatch = useAppDispatch();

  console.log(count);

  return (
    <div className="mt-10">
      <h1>Главная</h1>

      <button onClick={() => dispatch(inc(5))}>инкримент</button>
    </div>
  );
}
