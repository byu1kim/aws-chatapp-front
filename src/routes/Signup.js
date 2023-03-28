import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    console.log("clicked");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-2xl font-bold m-3">Create your account</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          className="border p-2 m-3 w-80 rounded active:outline-rose-300 focus:outline-rose-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="w-80 text-white rounded px-3 py-2 m-3 bg-rose-300 hover:bg-rose-400">
          Continue
        </button>
      </form>
      <div>
        Already have an account?{" "}
        <Link to="/login" className="text-rose-300 hover:text-rose-400">
          Log in
        </Link>
      </div>
    </div>
  );
}
