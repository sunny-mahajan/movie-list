import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "./LogoutIcon";
import PlusIcon from "./PlusIcon";

const Header = ({title}) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  useEffect(() => {
    setIsLoggedIn(
      typeof window !== "undefined" && localStorage.getItem("isLoggedIn")
    );
  }, []);

  const handleAddMovieClick = () => {
    router.push('/add-movie');
  };

  return (
    <header className="bg-[#093545] py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold flex gap-1 items-center">
          <p className="font-montserrat">{title}</p>
          {title === "My Movies" && (
            <button onClick={handleAddMovieClick}>
              <PlusIcon height="18" width="18"/>
            </button>
          )}
        </div>
        {isLoggedIn && (
          <div className="flex cursor-pointer" onClick={handleLogout}>
            <p className="mr-4">
              Logout
            </p>
            <LogoutIcon/>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
