import { PaginaListagem } from "../componentes/PaginaListagem";
import type { Categoria } from "../types/estoque";

export function CategoriasPage() {
    return (
        <PaginaListagem<Categoria> titulo="Categorias" recurso="categorias" colunas={[
            { titulo: "Nome", valor: (categoria) => categoria.nome },
        ]} />
    )
}
