import { useUsuario } from "../contexto/UsuarioContexto";

export function InicioPage() {
    const { usuario } = useUsuario();

    return (
        <div className="cartao">
            <h1>Olá, {usuario?.nome}</h1>
            <p>Controle de estoque de materiais elétricos da DW Engenharia Elétrica.</p>
        </div>
    )
}
