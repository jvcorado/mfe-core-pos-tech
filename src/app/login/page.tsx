"use client";

import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMicroFrontend = async () => {
      try {
        // Limpar container antes de carregar
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        // Carrega o iframe com a aplicação da porta 3001
        if (containerRef.current) {
          const iframe = document.createElement("iframe");
          iframe.src = process.env.NEXT_PUBLIC_MF_URL_LOGIN || "";
          iframe.style.width = "100%";
          iframe.style.height = "100vh";
          iframe.style.border = "none";
          iframe.style.minHeight = "100vh";

          // Adicionar eventos de load
          iframe.onload = () => {
            setLoading(false);
          };

          iframe.onerror = () => {
            setLoading(false);
          };

          containerRef.current.appendChild(iframe);
        }
      } catch (error) {
        console.error("Erro ao carregar micro frontend LOGIN:", error);
        setLoading(false);
      }
    };

    loadMicroFrontend();

    // Cleanup function para limpar iframe quando componente for desmontado
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []); // Array vazio para executar apenas uma vez

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <div
          ref={containerRef}
          className="w-full min-h-[calc(100vh-80px)]"
          id="login-microfrontend"
        />
      </main>

      {/* Loading absoluto com spinner girando */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 font-medium">Carregando...</p>
          </div>
        </div>
      )}
    </div>
  );
}
