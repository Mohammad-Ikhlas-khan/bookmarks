"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      await supabase.auth.getSession();
      router.push("/");
    };

    getSession();
  }, [router]);

  return <p>Signing you in...</p>;
}