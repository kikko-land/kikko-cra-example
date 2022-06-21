import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  DbProvider,
  EnsureDbLoaded,
  IInitDbClientConfig,
  initAbsurdWebBackend,
  migrationPlugin,
  reactiveQueriesPlugin,
} from "@trong-orm/react";
import { createNotesTableMigration } from "./migrations/createNotesTable";
import sqlWasmUrl from "@trong-orm/sql.js/dist/sql-wasm.wasm";
import { List } from "./List";

const config: IInitDbClientConfig = {
  dbName: "cra-example",
  dbBackend: initAbsurdWebBackend({
    wasmUrl: sqlWasmUrl,
  }),
  plugins: [
    migrationPlugin([createNotesTableMigration]),
    reactiveQueriesPlugin,
  ],
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DbProvider config={config}>
      <EnsureDbLoaded fallback={<div>Loading db...</div>}>
        <List />
      </EnsureDbLoaded>
    </DbProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
