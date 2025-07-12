"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MessangerWidget() {
  const [userId, setUserId] = useState<number>();
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:4000");

    socket.current.onopen = () => {
      console.log("Соединение открыто");

      const userId = localStorage.getItem("userId");

      if (!userId) {
        localStorage.setItem("userId", JSON.stringify(Date.now()));
      } else {
        setUserId(+userId);
      }

      // socket.send(
      //   JSON.stringify({
      //     id: 1,
      //     name: "Ilya",
      //   })
      // );
    };

    socket.current.onmessage = (event) => {
      console.log("Сообщение от сервера:", event.data);
    };

    socket.current.onclose = () => {
      console.log("Соединение закрыто");
    };

    socket.current.onerror = (error) => {
      console.error("Ошибка сокета:", error);
    };
  }, []);

  return <div>MessangerWidget</div>;
}
