import { Navigate, Outlet } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { Cabecalho } from "./Cabecalho";

export function AreaLogada() {
    const { usuario } = useUsuario();

    if (!usuario) return <Navigate to="/login" replace />;

    return (
        <>
            <Cabecalho />
            <main>
                <Outlet />
            </main>
        </>
    )
}
