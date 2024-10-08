import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
  const handleClick = () => {
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
    const queryOptions = `client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:8000/google&response_type=code&scope=email profile`;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryOptions}`;
    window.location.href = url;
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
      <button onClick={handleClick} className="bg-neutral-900 rounded-lg px-3 py-2 flex justify-between items-center gap-6 text-white text-xl hover:bg-neutral-800 transition-all duration-100">
        <FcGoogle className="size-8"/>
        Login com Google
      </button>
      </div>
    </>
  )
}

export default AuthPage