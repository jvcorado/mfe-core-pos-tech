"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CommunicationContextType {
  // Métodos para comunicação com outros MFEs
}

const CommunicationContext = createContext<
  CommunicationContextType | undefined
>(undefined);

export const CommunicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verifica se a mensagem é do MFE auth
      if (event.data && typeof event.data === "object") {
        const { type, token } = event.data;

        console.log("📨 Mensagem recebida:", {
          type,
          token: token ? "EXISTE" : "NÃO EXISTE",
        });

        switch (type) {
          case "AUTH_SUCCESS":
            // Salva APENAS o token no localStorage
            if (token) {
              localStorage.setItem("auth_token", token);
              console.log(
                "💾 Token salvo no MFE Core:",
                localStorage.getItem("auth_token") ? "SUCESSO" : "FALHOU"
              );
            }
            // Redireciona para dashboard
            router.push("/dashboard");
            break;

          case "AUTH_LOGOUT":
            // Limpa APENAS o token do localStorage
            localStorage.removeItem("auth_token");
            console.log("🧹 Token removido do MFE Core");
            // Redireciona para página inicial
            router.push("/");
            break;

          case "REQUEST_TOKEN":
            // Responde com o token para o MFE dashboard
            const storedToken = localStorage.getItem("auth_token");
            console.log(
              "🔑 Respondendo solicitação de token:",
              storedToken ? "EXISTE" : "NÃO EXISTE"
            );

            // Envia resposta de volta para o iframe que solicitou
            if (event.source && event.source !== window) {
              console.log("📤 Enviando TOKEN_RESPONSE para:", event.origin);
              (event.source as Window).postMessage(
                {
                  type: "TOKEN_RESPONSE",
                  token: storedToken,
                },
                "*"
              );
            } else {
              console.log(
                "❌ Não foi possível enviar resposta - event.source inválido"
              );
            }
            break;

          default:
            // Ignora mensagens não reconhecidas
            break;
        }
      }
    };

    // Adiciona listener para mensagens
    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  // Garantir que o contexto sempre retorne um objeto válido
  const contextValue = {
    // Métodos para comunicação com outros MFEs podem ser adicionados aqui
  };

  return (
    <CommunicationContext.Provider value={contextValue}>
      {children}
    </CommunicationContext.Provider>
  );
};

export const useCommunication = () => {
  const context = useContext(CommunicationContext);
  if (context === undefined) {
    console.error(
      "useCommunication deve ser usado dentro de um CommunicationProvider"
    );
    // Retorna um objeto vazio para evitar erros
    return {};
  }
  return context;
};
