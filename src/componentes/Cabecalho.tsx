import { Link } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { Logo } from "./Logo";

export function Cabecalho() {
    const { usuario, sair } = useUsuario();

    return (
        <header className="cabecalho">
            <Logo />
            <span>Olá, {usuario?.nome}</span>
            <nav>
                <Link to="/inicio">Início</Link>
                <Link to="/perfil">Meus dados</Link>
                <button type="button" onClick={sair}>Sair</button>
            </nav>
        </header>
    )
}
