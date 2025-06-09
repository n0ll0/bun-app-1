
import { lazy, useEffect, useState } from 'react';
import Header from "@/components/Header";
import "@/public/index.css";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("@/components/pages/Home"));
const Auth = lazy(() => import("@/components/pages/Auth"));
import { AuthProvider, useAuthToken } from '@/components/AuthContext';

export function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <footer>
          nu uh
        </footer>
      </AuthProvider>
    </>
  );
}

export default App;
