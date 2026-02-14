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

        const signIn = async (email, password) => {
          const { error, data } = await supabase.auth.signInWithPassward({email, password});

          if (error) {
            console.log("sign in failed:", error.message)
          }
          else {
            console.log("sign in successful.")
          }

          return { data, error }
        }

        const signUp = async (email, password) => {
          const { error, data } = await supabase.auth.signUp({email, password});

          if (error) {
            console.log("sign up failed:", error.message)
          }
          else {
            console.log("sign up successful.")
          }

          return { data, error }
        }

        const signOut = async () => {
          const { error } = await supabase.auth.signOut();
          console.log("signed out.")
          return error;
        }

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [])

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
