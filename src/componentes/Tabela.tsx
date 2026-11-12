import type { ReactNode } from "react";

export type Coluna<T> = { titulo: string; valor: (item: T) => ReactNode };

type Props<T> = {
    colunas: Coluna<T>[];
    itens: T[];
    acoes: (item: T) => ReactNode;
}

// Rubrica: componente genérico e reutilizável, a mesma tabela serve aos 4 CRUDs
export function Tabela<T extends { id: number }>({ colunas, itens, acoes }: Props<T>) {
    return (
        <div className="tabela">
            <table>
                <thead>
                    <tr>
                        {colunas.map((coluna) => <th key={coluna.titulo}>{coluna.titulo}</th>)}
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr key={item.id}>
                            {colunas.map((coluna) => <td key={coluna.titulo}>{coluna.valor(item)}</td>)}
                            <td className="acoes">{acoes(item)}</td>
                        </tr>
                    ))}
                    {itens.length === 0 && (
                        <tr>
                            <td colSpan={colunas.length + 1}>Nenhum registro encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
