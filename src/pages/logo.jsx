const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-message-circle h-6 w-6 mr-2 text-white"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 9h4l2 2h3v4M16 14l2-2"></path>
      </svg>
      <span className="font-semibold text-lg tracking-tight text-white"></span>
    </div>
  );
};

export default Logo;
