import { Auth, API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Logout() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  console.log(user);
  return (
    <>
      {user ? (
        <div className="text-white p-3">
          <div>Hello, {user && user.username}!</div>
          <button className="hover:text-rose-400" onClick={signOut}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

// add user
