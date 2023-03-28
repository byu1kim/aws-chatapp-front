import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="flex flex-col justify-center items-center h-screen text-xl">
      <div>
        <i className="fa-solid fa-star"></i>
      </div>
      <div className="m-3">Welcome to ByulPT</div>
      <div className="mb-3">Log in to continue</div>
      <div>
        <button className="bg-rose-300 font-bold text-base px-3 py-2 m-3 rounded text-white hover:bg-rose-400">
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </main>
  );
}
