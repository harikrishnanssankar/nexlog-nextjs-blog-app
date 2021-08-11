import { useContext, useState } from "react";
import { supabase } from "../api";
import { AuthContext } from "../store/Context";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMenuOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className="absolute w-full flex items-center justify-between p-1 md:p-4 border-b border-gray-300">
      <span
        onClick={() => router.push("/")}
        className="text-xl md:text-2xl ml-4 md:ml-7 mr-6 cursor-pointer z-20"
      >
        NexLog
      </span>
      <div className="hidden md:flex items-center justify-between w-full gap-3 relative">
        <span onClick={() => router.push("/")} className="mr-6 cursor-pointer">
          Home
        </span>
        {user ? (
          <>
            <div>
              <span
                onClick={() => router.push("/my-posts")}
                className="mr-6 cursor-pointer"
              >
                My Posts
              </span>
              <span
                onClick={() => router.push("/profile")}
                className="mr-6 cursor-pointer"
              >
                Profile
              </span>
              <span
                onClick={() => {
                  supabase.auth.signOut();
                }}
                className="mr-6 cursor-pointer"
              >
                logout
              </span>
            </div>
          </>
        ) : (
          <span
            onClick={() => router.push("/login")}
            className="mr-6 cursor-pointer"
          >
            Login
          </span>
        )}
      </div>
      {!open && (
        <div
          onClick={handleMenuOpen}
          className="md:hidden flex flex-col ml-auto mr-5 cursor-pointer"
        >
          <div className="border-b-2 border-black w-5 mb-1"></div>
          <div className="border-b-2 border-black w-3 mb-1"></div>
          <div className="border-b-2 border-black w-6"></div>
        </div>
      )}
      {open && (
        <div className="flex z-10 justify-center fixed bottom-0 left-0 w-full h-screen bg-gray-500 bg-opacity-80 text-white">
          <div className="flex flex-col w-3/4 h-screen items-center justify-center">
            <span
              onClick={() => {
                router.push("/");
                setOpen(!open);
              }}
              className="shadow-sm pb-2 cursor-pointer w-full text-center"
            >
              Home
            </span>
            {user ? (
              <>
                <span
                  onClick={() => {
                    router.push("/profile");
                    setOpen(!open);
                  }}
                  className="shadow-sm pb-2 pt-2 cursor-pointer w-full text-center"
                >
                  Profile
                </span>
                <span
                  onClick={() => {
                    router.push("/my-posts");
                    setOpen(!open);
                  }}
                  className="shadow-sm pb-2 pt-2 cursor-pointer w-full text-center"
                >
                  My Posts
                </span>
                <span
                  onClick={() => {
                    supabase.auth.signOut();
                    setOpen(!open);
                  }}
                  className="shadow-sm pb-2 pt-2 cursor-pointer w-full text-center"
                >
                  Logout
                </span>
              </>
            ) : (
              <span
                onClick={() => {
                  router.push("/login");
                  setOpen(!open);
                }}
                className="shadow-sm pb-2 pt-2 cursor-pointer w-full text-center"
              >
                Login
              </span>
            )}
          </div>
          <span
            onClick={handleMenuOpen}
            className="fixed top-0 right-6 text-3xl cursor-pointer "
          >
            x
          </span>
        </div>
      )}
      <span
        onClick={() => {
          router.push("/create-post");
        }}
        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-2xl fixed bottom-8 right-8"
      >
        +
      </span>
    </nav>
  );
};

export default Navbar;
