import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LogoutIcon from "./LogoutIcon";

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

  return (
    <header className="bg-[#093545] py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">
          <p className="font-montserrat">{title}</p>
        </div>
        {isLoggedIn && (
          <div className="flex">
            <p onClick={handleLogout} className="mr-4 cursor-pointer">
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
