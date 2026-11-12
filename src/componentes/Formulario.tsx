import type { ReactNode, SubmitEvent } from "react";
import { Link } from "react-router-dom";

type Props = {
    titulo: string;
    voltarPara: string;
    erroApi: string;
    onSubmit: (event: SubmitEvent) => void;
    children: ReactNode;
}

export function Formulario({ titulo, voltarPara, erroApi, onSubmit, children }: Props) {
    return (
        <form className="cartao" onSubmit={onSubmit} noValidate>
            <h1>{titulo}</h1>
            {children}
            {erroApi && <p className="erro-api" role="alert">{erroApi}</p>}
            <button type="submit">Salvar</button>
            <Link to={voltarPara}>Voltar</Link>
        </form>
    )
}
