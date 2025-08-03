"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = (): boolean => {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("auth_token");
    console.log(
      "🔍 Verificando token no MFE Core:",
      token ? "EXISTE" : "NÃO EXISTE"
    );

    return !!token;
  };

  useEffect(() => {
    console.log("🚀 Inicializando AuthContext do MFE Core");

    const initializeAuth = () => {
      const isAuth = checkAuth();
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

      console.log("📍 Path atual:", currentPath, "isAuth:", isAuth);

      // Se não está autenticado e está tentando acessar dashboard, redireciona
      if (!isAuth && currentPath === "/dashboard") {
        console.log("🚫 ACESSO NEGADO - Redirecionando para login");
        router.push("/login");
      }

      // Se está autenticado e nas páginas de login/register, redireciona para dashboard
      if (
        isAuth &&
        (currentPath === "/login" ||
          currentPath === "/register" ||
          currentPath === "/")
      ) {
        console.log("🔄 Usuário autenticado - redirecionando para dashboard");
        router.push("/dashboard");
      }
    };

    // Executa imediatamente
    initializeAuth();

    // Sempre define loading como false após verificação
    console.log("⏰ Definindo loading como false");
    setLoading(false);
  }, [router]);

  // Efeito adicional para monitorar mudanças na rota
  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const isAuth = checkAuth();

      console.log(
        "🛣️ Mudança de rota detectada no MFE Core:",
        currentPath,
        "isAuth:",
        isAuth
      );

      // Se está tentando acessar dashboard sem estar autenticado, redireciona
      if (currentPath === "/dashboard" && !isAuth) {
        console.log("🚫 ACESSO NEGADO - Redirecionando para login");
        router.push("/login");
      }

      // Se está autenticado e nas páginas de login/register, redireciona para dashboard
      if (
        isAuth &&
        (currentPath === "/login" ||
          currentPath === "/register" ||
          currentPath === "/")
      ) {
        console.log("🔄 Usuário autenticado - redirecionando para dashboard");
        router.push("/dashboard");
      }
    };

    // Adiciona listener para mudanças de rota
    window.addEventListener("popstate", handleRouteChange);

    // Também verifica quando o componente monta
    handleRouteChange();

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [router]);

  const isAuthenticated = checkAuth();

  // Garantir que o contexto sempre retorne valores válidos
  const contextValue = {
    isAuthenticated,
    loading,
    checkAuth,
  };

  console.log(
    "🎯 AuthContext render - loading:",
    loading,
    "isAuthenticated:",
    isAuthenticated
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error("useAuth deve ser usado dentro de um AuthProvider");
    // Retorna um objeto com valores padrão para evitar erros
    return {
      isAuthenticated: false,
      loading: false,
      checkAuth: () => false,
    };
  }
  return context;
};
