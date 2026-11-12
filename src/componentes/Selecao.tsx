export type Opcao = { valor: string; texto: string };

type Props = {
    rotulo: string;
    valor: string;
    opcoes: Opcao[];
    erro?: string;
    onChange: (valor: string) => void;
}

export function Selecao({ rotulo, valor, opcoes, erro, onChange }: Props) {
    return (
        <label className="campo">
            {rotulo}
            <select value={valor} onChange={(event) => onChange(event.target.value)}>
                <option value="">Selecione</option>
                {opcoes.map((opcao) => <option key={opcao.valor} value={opcao.valor}>{opcao.texto}</option>)}
            </select>
            {erro && <small>{erro}</small>}
        </label>
    )
}
