"use client";
import { supabase } from "@/lib/supabaseClient";
import { sign } from "crypto";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

function BookmarksList() {
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const { session } = useAuth();
    const fetchBookmarks = async () => {
        try {
            const { data:{user}} = await supabase.auth.getUser();
            if (!user) {
                console.error("No active session found. Please sign in.");
                return;
            }
            const userId = user.id;
            const { data } = await supabase.from("BookMarks").select("*").eq("user_id", userId);
            setBookmarks(data || []);
        } 
        catch (error) {
            console.error("Error fetching bookmarks:", error);
        }
    };

    const deleteBookmark = async (id: any) => {
        try {
            await supabase.from("BookMarks").delete().eq("id", id);
            fetchBookmarks(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting bookmark:", error);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const addNewBookmarkHandler = () => {
        window.location.href = "/bookmarks/add";
    }
    
    const signOutHandler = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Error signing out:", error.message);  
        window.location.href = "/"; // Redirect to home page after sign out
    }
    
    useEffect(() => {
            const channel = supabase.channel("bookmarks-channel");
            channel
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "BookMarks" },
                (payload) => {
                const newBookmark = payload.new as any;
                setBookmarks((prev) => [...prev, newBookmark]);
                }
            )
            .subscribe((status) => {
                console.log("Subscription: ", status);
            });
        }, []);
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md gap-x-8">
            {session ?
            (<div>
                <h2 className="text-2xl font-bold mb-4">Your Bookmarks</h2>
            <div className="flex justify-between">
                <button onClick={addNewBookmarkHandler} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                 Add New Bookmark
                </button>
                <button onClick={signOutHandler} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Sign Out
                </button>
            </div>
            <div className="mt-6">
            {bookmarks.length > 0 ? (
                <ul className="space-y-2">
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id} className="border-b pb-2">
                            <p>{bookmark.title}</p>
                            <a href={bookmark.url} className="text-blue-600 hover:underline">
                                {bookmark.url}
                            </a>
                            <button
                                onClick={() => deleteBookmark(bookmark.id)}
                                className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                                  Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No bookmarks available.</p>
            )}
            </div>
            </div>) : (<div className="flex flex-col items-center gap-y-4 mt-6">
                  <p  className="text-red-500 text-lg">You must be signed in to view your bookmarks.</p>
                  <button onClick={() => window.location.href = "/sign-in"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Sign In
                </button>
                </div>)}
        </div>
    );
}

export default BookmarksList;