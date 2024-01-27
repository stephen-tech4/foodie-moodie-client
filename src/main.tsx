import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { publicClient } from "./apollo.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Set public graphql endpoints
  <ApolloProvider client={publicClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
);
