import { useCallback, useEffect, useState } from "react";
import { api } from "../api/axios";
import { mensagemDeErro } from "../api/erros";
import type { Pagina } from "../types/estoque";

export function useListagem<T>(recurso: string) {
    const [pagina, setPagina] = useState(1);
    const [lista, setLista] = useState<Pagina<T>>({ dados: [], pagina: 1, total: 0, totalPaginas: 0 });
    const [erro, setErro] = useState("");

    const carregar = useCallback(() => {
        api.get<Pagina<T>>(`/${recurso}`, { params: { pagina, limite: 10 } })
            .then(({ data }) => setLista(data))
            .catch((falha) => setErro(mensagemDeErro(falha)));
    }, [recurso, pagina]);

    useEffect(carregar, [carregar]);

    async function excluir(id: number) {
        if (!window.confirm("Excluir este registro?")) return;
        setErro("");

        try {
            await api.delete(`/${recurso}/${id}`);
            carregar();
        } catch (falha) {
            setErro(mensagemDeErro(falha));
        }
    }

    return { ...lista, erro, excluir, setPagina };
}
