"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useRouter } from "next/navigation";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default function Home() {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <div>
        <button onClick={() => router.push("/registr")}>Регистрация</button>
      </div>
    </ApolloProvider>
  );
}
