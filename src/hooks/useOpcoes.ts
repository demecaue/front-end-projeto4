import { useEffect, useState } from "react";
import { api } from "../api/axios";
import type { Opcao } from "../componentes/Selecao";
import type { Pagina } from "../types/estoque";

export function useOpcoes(recurso: string) {
    const [opcoes, setOpcoes] = useState<Opcao[]>([]);

    useEffect(() => {
        api.get<Pagina<{ id: number; nome: string }>>(`/${recurso}`, { params: { limite: 50 } })
            .then(({ data }) => setOpcoes(data.dados.map((item) => ({ valor: String(item.id), texto: item.nome }))))
            .catch(() => setOpcoes([]));
    }, [recurso]);

    return opcoes;
}
