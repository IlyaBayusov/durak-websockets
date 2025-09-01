"use client";

import React from "react";
import { setupStore } from "../stores/store";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }) {
  const store = setupStore();

  return <Provider store={store}>{children}</Provider>;
}
