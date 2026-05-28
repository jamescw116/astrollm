"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import supabase from "@/lib/supabase/supabaseClient";

const LoginAuth = () => (
  <div
    className={`
      flex flex-col h-dvh w-screen overflow-hidden
      justify-center items-center
      md:flex-row
    `}
  >
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={[]} // 先留空，以後加 Google 再填 ['google']
    />
  </div>
);

export default LoginAuth;
