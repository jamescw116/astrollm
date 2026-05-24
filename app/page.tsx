"use client";

import Layout from "@/components/Layout/Layout";
import ThemeProvider from "@/lib/ThemeProvider";

const Home = () => {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
};

export default Home;
