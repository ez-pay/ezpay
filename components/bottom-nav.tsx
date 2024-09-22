export default function NavBar() {
  return (
    <nav className="bg-white text-gray-700 py-4 fixed bottom-0 w-full shadow-md">
      <div className="container mx-auto flex justify-around">
        <button className="text-purple-500 flex flex-col items-center"
            onClick={() => (window.location.href = "/homepage")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l9-9 9 9M3 12l9 9 9-9"
            />
          </svg>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center"
        onClick={() => (window.location.href = "/profile")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 13l-4 4m0 0l-4-4m4 4V7"
            />
          </svg>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}
