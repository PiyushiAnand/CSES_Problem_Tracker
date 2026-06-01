function Navbar({ user, logout, resetAllProgress }) {
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
          onClick={() => {
            if (
              window.confirm(
                "Reset all progress?"
              )
            ) {
              resetAllProgress();
            }
          }}
          className="px-3 py-2 bg-red-700 rounded hover:bg-red-600"
        >
          Reset All
        </button>

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