import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "./routes/Entry";
import Login from "./routes/Login";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./components/RouteGuard";

const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: process.env.REACT_APP_API_URL,
        region: process.env.REACT_APP_REGION,
      },
    ],
  },
};
Amplify.configure(amplifyConfig);

export default function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Entry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chat"
            element={
              <RouteGuard>
                <Main />
              </RouteGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}
