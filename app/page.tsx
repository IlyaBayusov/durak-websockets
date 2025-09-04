"use client";

import { api } from "@/src/axios";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { IUser } from "@/src/interfaces";
import { userSlice } from "@/src/stores/reducers/UserSlice";
import { decodedToken } from "@/src/utils";
import { useEffect, useRef, useState } from "react";

interface IResWS {
  event: string;
  ok: boolean;
  message: string;
  // groupId: number;
}

export default function Home() {
  // const { users, count } = useAppSelector((state) => state.userReducer);

  // const { inc } = userSlice.actions;
  // const dispatch = useAppDispatch();

  // console.log(count);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [username, setUserName] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/users");
        const data = response.data;

        if (data) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const connect = (senderId: number, recipientId: number) => {
    // e.preventDefault();

    socket.current = new WebSocket("ws://localhost:4000");

    socket.current.onopen = () => {
      setIsConnected(true);
      console.log("Сокет открыт");

      console.log("sending:", {
        event: "create-message-group",
        senderId,
        recipientId,
      });

      socket.current?.send(
        JSON.stringify({ event: "create-message-group", senderId, recipientId })
      );
    };
    socket.current.onmessage = (event) => {
      const data: IResWS = JSON.parse(event.data);

      console.log(event);

      switch (event.data.event) {
        case "create-message-group":
          if (!data.groupId) {
            socket.current?.close(500, "Ошибка получения groupId с сервера");
            return;
          }

          localStorage.setItem("groupId", data.groupId.toString());

          socket.current?.send(
            JSON.stringify({
              event: "get-messages-in-group",
              groupId: data.groupId,
            })
          );
          break;
        case "create-message-group":
          setMessages(data.messages);
          break;

        default:
          break;
      }
    };
    socket.current.onclose = () => {
      console.log("Сокет закрыт");
    };
    socket.current.onerror = () => {
      console.log("Сокет ошибка");
    };
  };

  const handleOpenGroup = (user: IUser) => {
    const token = decodedToken();

    if (!token.ok || !token.token) {
      console.error("Ошибка входа в группу, токен не найден");
      return;
    }

    connect(token.token.userId, user.id);
  };

  return (
    <div className="mt-10">
      <h1>Главная</h1>

      <div className="px-5 flex items-center gap-5">
        {users &&
          users.map((user) => (
            <button onClick={() => handleOpenGroup(user)} key={user.id}>
              {user.username}
            </button>
          ))}
      </div>

      <div>
        {messages &&
          messages.map((message) => <button key={message}>{message}</button>)}
      </div>

      {isConnected && (
        <div className="mt-5 h-full w-full flex justify-center items-center">
          <div className="p-3 h-[550px] w-[550px] border border-black flex flex-col items-center gap-5 rounded-md">
            <div className="flex-1 w-full border border-red-500 rounded-md overflow-y-auto">
              <div className="mess-item"></div>
            </div>

            <div className="flex items-center gap-5">
              <input type="text" className="w-[350px] border" />

              <button>Отправить</button>
            </div>
          </div>
        </div>
      )}

      {/* <button onClick={() => dispatch(inc(5))}>инкримент</button> */}
    </div>
  );
}
