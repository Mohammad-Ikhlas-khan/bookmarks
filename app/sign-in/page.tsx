"use client";
import { supabase} from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
function SignIn() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options:{
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    if (error) console.error('Error signing in with Google:', error.message);
    return;
  }

  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      router.push("/"); // Redirect to home page after successful sign-in
    }
  }, [session, router]);
  
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-zinc-500 font-sans dark:bg-black gap-y-8">
        <div className="text-lg text-pink-500">Please sign in to add,view and delete bookmarks</div>
        <button onClick={signInWithGoogle} className="w-1/4 mx-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Sign in with Google
        </button>
    </div>
  )
}

export default SignIn
