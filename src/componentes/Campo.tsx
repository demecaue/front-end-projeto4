type Props = {
    rotulo: string;
    tipo?: string;
    valor: string;
    erro?: string;
    desabilitado?: boolean;
    onChange?: (valor: string) => void;
}

export function Campo({ rotulo, tipo = "text", valor, erro, desabilitado, onChange }: Props) {
    return (
        <label className="campo">
            {rotulo}
            <input type={tipo} value={valor} disabled={desabilitado} onChange={(event) => onChange?.(event.target.value)} />
            {erro && <small>{erro}</small>}
        </label>
    )
}
