import { PaginaListagem } from "../componentes/PaginaListagem";
import { statusObra, type Obra, type StatusObra } from "../types/estoque";
import { dataBr } from "../utils/formatar";

// Rubrica: componente exclusivo da página em função separada
function EtiquetaStatus({ status }: { status: StatusObra }) {
    return <span className={status === "PARALISADA" ? "etiqueta alerta" : "etiqueta"}>{statusObra[status]}</span>
}

export function ObrasPage() {
    return (
        <PaginaListagem<Obra> titulo="Obras" recurso="obras" colunas={[
            { titulo: "Título", valor: (obra) => obra.titulo },
            { titulo: "Cliente", valor: (obra) => obra.cliente },
            { titulo: "Status", valor: (obra) => <EtiquetaStatus status={obra.status} /> },
            { titulo: "Início", valor: (obra) => dataBr(obra.data_inicio) },
        ]} />
    )
}
