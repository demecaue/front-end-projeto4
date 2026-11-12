import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { api } from "../api/axios";
import { mensagemDeErro } from "../api/erros";

type Texto = Record<string, string>;

export function useFormularioRecurso<T extends Texto>(recurso: string, schema: z.ZodType<T>, inicial: T) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(inicial);
    const [erros, setErros] = useState<Partial<Record<keyof T, string[]>>>({});
    const [erroApi, setErroApi] = useState("");

    useEffect(() => {
        if (!id) return;
        api.get<Record<string, unknown>>(`/${recurso}/${id}`)
            .then(({ data }) => setForm((atual) => paraTexto(data, atual)))
            .catch((erro) => setErroApi(mensagemDeErro(erro)));
    }, [recurso, id]);

    function alterar(campo: keyof T) {
        return (valor: string) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    async function salvar(event: SubmitEvent) {
        event.preventDefault();
        setErroApi("");
        const resultado = schema.safeParse(form);

        if (!resultado.success) {
            setErros(z.flattenError(resultado.error).fieldErrors as Partial<Record<keyof T, string[]>>);
            return;
        }

        setErros({});

        try {
            if (id) await api.put(`/${recurso}/${id}`, resultado.data);
            else await api.post(`/${recurso}`, resultado.data);
            navigate(`/${recurso}`);
        } catch (erro) {
            setErroApi(mensagemDeErro(erro));
        }
    }

    return { form, erros, erroApi, alterar, salvar, editando: Boolean(id) };
}

function paraTexto<T extends Texto>(dados: Record<string, unknown>, modelo: T) {
    return Object.fromEntries(Object.keys(modelo).map((campo) => [campo, String(dados[campo] ?? "")])) as T;
}
