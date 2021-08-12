import Link from "next/link";
import { useState } from "react";
import { supabase } from "/api";
import { useRouter } from "next/router"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user, session, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error;
      alert('Signed Up')
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className="flex h-screen w-full justify-center items-center ">
      <div className="flex flex-col w-min h-3/5 justify-evenly shadow-lg p-10 items-center">
        <span className="text-2xl" >SignUp</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-5 "
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-1 rounded mb-4"
            placeholder="email"
            type="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border p-1 rounded mb-4"
            type="password"
          />
          <button className="bg-blue-500 rounded shadow-lg text-white w-full p-1" type="submit">SignUp</button>
        </form>
        <span className="text-sm" onClick={() => router.push('/login')} >
          Already nexlog user? <span className="cursor-pointer underline">Login</span>
        </span>
      </div>
    </div>
  );
};

export default Signup;
