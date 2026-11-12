import { Navigate, useNavigate } from "react-router-dom";
import { Logo } from "../componentes/Logo";
import type { UsuarioLogado } from "../types/login";

export function InicioPage() {
    const navigate = useNavigate();
    const usuario: UsuarioLogado | null = JSON.parse(localStorage.getItem("usuario") ?? "null");

    if (!localStorage.getItem("token") || !usuario) return <Navigate to="/login" replace />;

    function sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    }

    return (
        <div className="cartao">
            <Logo />
            <h1>Olá, {usuario.nome}</h1>
            <p>Controle de estoque de materiais elétricos da DW Engenharia Elétrica.</p>
            <button type="button" onClick={sair}>Sair</button>
        </div>
    )
}
