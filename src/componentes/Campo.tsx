type Props = {
    rotulo: string;
    tipo?: string;
    valor: string;
    erro?: string;
    onChange: (valor: string) => void;
}

export function Campo({ rotulo, tipo = "text", valor, erro, onChange }: Props) {
    return (
        <label className="campo">
            {rotulo}
            <input type={tipo} value={valor} onChange={(event) => onChange(event.target.value)} />
            {erro && <small>{erro}</small>}
        </label>
    )
}
