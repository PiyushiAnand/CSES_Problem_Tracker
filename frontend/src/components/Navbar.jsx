function Navbar({ user, logout }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <h1 className="text-2xl font-bold">
        CSES Tracker
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-zinc-300">
          {user.username}
        </span>

        <button
          onClick={logout}
          className="
            px-3
            py-2
            rounded-lg
            bg-red-600
            hover:bg-red-500
            transition
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;