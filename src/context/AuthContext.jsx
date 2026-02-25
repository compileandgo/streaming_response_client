import { useEffect, createContext, useState } from "react";
import { supabase } from "../services/supabaseClient";

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

        const signIn = async (email, password) => {
          const { data, error } = await supabase.auth.signInWithPassword({email, password});
          setError(error);
          return { data, error }
        }

        const signUp = async (email, password) => {
          const { data, error } = await supabase.auth.signUp({email, password})
          setError(error);
          return { data, error }
        }

        const signOut = async () => {
          const { error } = await supabase.auth.signOut();
          setError(error);
          return error;
        }
    
    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false)
        })

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [])

    const value = {
        user,
        signUp,
        signIn,
        signOut,
        error,
        setError,
        loading,
        setLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
