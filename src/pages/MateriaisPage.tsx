import { PaginaListagem } from "../componentes/PaginaListagem";
import type { Material } from "../types/estoque";
import { moeda } from "../utils/formatar";

// Rubrica: componente exclusivo da página em função separada
function SituacaoEstoque({ material }: { material: Material }) {
    const baixo = material.estoque_atual < material.estoque_minimo;

    return (
        <span className={baixo ? "etiqueta alerta" : "etiqueta"}>
            {material.estoque_atual} {material.unidade}{baixo && " (baixo)"}
        </span>
    )
}

export function MateriaisPage() {
    return (
        <PaginaListagem<Material> titulo="Materiais" recurso="materiais" colunas={[
            { titulo: "Nome", valor: (material) => material.nome },
            { titulo: "Categoria", valor: (material) => material.categoria },
            { titulo: "Valor", valor: (material) => moeda(material.valor_unitario) },
            { titulo: "Estoque", valor: (material) => <SituacaoEstoque material={material} /> },
        ]} />
    )
}
