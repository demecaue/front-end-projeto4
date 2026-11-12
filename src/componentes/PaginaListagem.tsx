import { Link } from "react-router-dom";
import { useListagem } from "../hooks/useListagem";
import { Paginacao } from "./Paginacao";
import { Tabela, type Coluna } from "./Tabela";

type Props<T> = {
    titulo: string;
    recurso: string;
    colunas: Coluna<T>[];
}

// Rubrica: tela composta por vários componentes (tabela, paginação e links)
export function PaginaListagem<T extends { id: number }>({ titulo, recurso, colunas }: Props<T>) {
    const { dados, pagina, totalPaginas, erro, excluir, setPagina } = useListagem<T>(recurso);

    return (
        <section className="listagem">
            <div className="topo">
                <h1>{titulo}</h1>
                {/* Rubrica: cadastro e edição em tela separada da listagem */}
                <Link className="botao" to={`/${recurso}/novo`}>Novo</Link>
            </div>
            {erro && <p className="erro-api" role="alert">{erro}</p>}
            <Tabela colunas={colunas} itens={dados} acoes={(item) => (
                <>
                    <Link to={`/${recurso}/${item.id}`}>Editar</Link>
                    <button type="button" onClick={() => excluir(item.id)}>Excluir</button>
                </>
            )} />
            {/* Rubrica: paginação das listagens */}
            <Paginacao pagina={pagina} totalPaginas={totalPaginas} onMudar={setPagina} />
        </section>
    )
}
