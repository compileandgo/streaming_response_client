import { useEffect, createContext, useState } from "react";
import { supabase } from "../services/supabaseClient";

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // return () => {
        //     listener?.unsubscribe();
        // };
    }, [])

    const value = {
        user,
        loading,
        signIn: async (email, password) => await supabase.auth.signInWithPassword({email, password}),
        signUp: (email, password) => supabase.auth.signUp({email, password}),
        signOut: () => supabase.auth.signOut(),
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
