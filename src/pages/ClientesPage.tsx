import { PaginaListagem } from "../componentes/PaginaListagem";
import type { Cliente } from "../types/estoque";

export function ClientesPage() {
    return (
        <PaginaListagem<Cliente> titulo="Clientes" recurso="clientes" colunas={[
            { titulo: "Nome", valor: (cliente) => cliente.nome },
            { titulo: "Cidade", valor: (cliente) => cliente.cidade },
        ]} />
    )
}
