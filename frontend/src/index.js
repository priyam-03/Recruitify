import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "@apollo/client";

import client from "./graphQl/apolloclient";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
