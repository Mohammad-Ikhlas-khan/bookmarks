"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const [session,setSession]=useState<any>(null);
        const [loading,setLoading]=useState(true);
        const fetchSession = async () => {
            const currentSession= await supabase.auth.getSession();
            setSession(currentSession.data.session);
            setLoading(false);
        }

        useEffect(() => {
            fetchSession();
            const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            });
            return () => {
            authListener.subscription.unsubscribe();
            };
        }, []);
    if (loading) {
        return 
            <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
}
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);