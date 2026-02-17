"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState} from "react";
import { useAuth } from "@/app/context/AuthContext";

function AddBookmark() {
  const [newBookmark, setNewBookmark] = useState({ url: "", title: "" });
  const { session } = useAuth();

  const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
        };
  const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { data:{user}}= await supabase.auth.getUser();
        if (!isValidUrl(newBookmark.url)) {
            alert("Please enter a valid URL.");
            return;
        }
        try {
            await supabase.from("BookMarks").insert({
                ...newBookmark,
                url: newBookmark.url,
                title: newBookmark.title,
                user_id: user?.id
            });
            setNewBookmark({ url: "", title: "" });
        } catch (error) {
            console.error("Error adding bookmark:", error);
        }
    }

    return (
        <div className="flex flex-col justify-center align-middle items-center max-w-md m-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {session ? 
            (<div>
            <h2 className="text-2xl font-bold mb-4">Add New Bookmark</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="url" className="block text-gray-700 font-bold mb-2">URL</label>
                    <input
                        type="text"
                        id="url"
                        value={newBookmark.url}
                        onChange={(e) => setNewBookmark({...newBookmark, url: e.target.value})}
                        className="w-full px-3 py-2 text-blue-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={newBookmark.title}
                        onChange={(e) => setNewBookmark({...newBookmark, title: e.target.value})}
                        className="w-full px-3  py-2 text-blue-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Add Bookmark
                </button>   
            </form>
            <button onClick={() => window.location.href = "/bookmarks/list"} className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                    View Bookmarks
                </button>
            </div>) : (<div className="flex flex-col items-center gap-y-4 mt-6">
                  <p  className="text-red-500 text-lg">You must be signed in to add bookmarks.</p>
                  <button onClick={() => window.location.href = "/sign-in"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Sign In
                </button>
                </div>)}
        </div>
);}

export default AddBookmark