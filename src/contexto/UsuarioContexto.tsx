import { createContext, useContext, useState, type ReactNode } from "react";
import type { UsuarioLogado } from "../types/login";

type ContextoUsuario = {
    usuario: UsuarioLogado | null;
    entrar: (token: string, usuario: UsuarioLogado) => void;
    atualizar: (usuario: UsuarioLogado) => void;
    sair: () => void;
};

const UsuarioContexto = createContext<ContextoUsuario | null>(null);

// Rubrica: contexto para exibir as informações do usuário globalmente
export function UsuarioProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<UsuarioLogado | null>(() => JSON.parse(localStorage.getItem("usuario") ?? "null"));

    function entrar(token: string, novo: UsuarioLogado) {
        // Rubrica: armazenar o token no localStorage
        localStorage.setItem("token", token);
        atualizar(novo);
    }

    function atualizar(novo: UsuarioLogado) {
        localStorage.setItem("usuario", JSON.stringify(novo));
        setUsuario(novo);
    }

    function sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    }

    return (
        <UsuarioContexto.Provider value={{ usuario, entrar, atualizar, sair }}>
            {children}
        </UsuarioContexto.Provider>
    )
}

export function useUsuario() {
    const contexto = useContext(UsuarioContexto);
    if (!contexto) throw new Error("useUsuario precisa estar dentro do UsuarioProvider");
    return contexto;
}
