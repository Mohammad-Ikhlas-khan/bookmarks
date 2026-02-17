"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
export default function Home() {
  const { session } = useAuth();
  const signInHandler = () => {
    window.location.href = "/sign-in";
  }
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-500 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Smart Bookmark App</h1>
      <div className="mt-4 text-center">
        <p className="text-lg text-zinc-700 dark:text-zinc-300">Welcome to the Smart Bookmark App!</p>
        <p className="text-lg text-zinc-700 dark:text-zinc-300">This is a simple application to manage your bookmarks efficiently.</p>
      </div>
      {session ? (
        <div className="flex flex-col items-center gap-y-4 mt-6">
            <button onClick={() => window.location.href = "/bookmarks/add"} 
                    className="text-lg text-green-500 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">Add a new bookmark!</button>
            <button onClick={() => window.location.href = "/bookmarks/list"}
                    className="text-lg text-blue-500 bg-violet-300 hover:bg-violet-400 px-4 py-2 rounded-md">View your bookmarks!</button>
        </div>
      ) : (
          <div className="flex flex-col items-center gap-y-4 mt-6">
        <div className="text-lg text-red-500">You are not signed in. Please sign in to access your bookmarks.</div>
        <button 
            onClick={signInHandler}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ">
            Sign-in or Sign-up
        </button>
      </div>
)}
    </div>
  );
}
