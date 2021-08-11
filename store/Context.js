import { createContext, useEffect, useState } from "react";
import { supabase } from "../api";

export const AuthContext = createContext(null);

export default function Context  ({children})  {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
            checkUser()
        );
        checkUser();
        return () => {
            authListener?.unsubscribe();
        };
    }, []);
    async function checkUser() {
        const user = supabase.auth.user();
        setUser(user);
    }

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}