import { z } from "zod";

export type Pagina<T> = {
    dados: T[];
    pagina: number;
    total: number;
    totalPaginas: number;
};

export const statusObra = {
    EM_ANDAMENTO: "Em andamento",
    CONCLUIDA: "Concluída",
    PARALISADA: "Paralisada",
} as const;

export type StatusObra = keyof typeof statusObra;

export type Categoria = { id: number; nome: string };
export type Cliente = { id: number; nome: string; cidade: string };

export type Material = {
    id: number;
    categoria_id: number;
    categoria: string;
    nome: string;
    unidade: string;
    valor_unitario: number;
    estoque_atual: number;
    estoque_minimo: number;
};

export type Obra = {
    id: number;
    cliente_id: number;
    cliente: string;
    titulo: string;
    status: StatusObra;
    data_inicio: string;
};

// Rubrica: validação dos campos obrigatórios nos formulários dos CRUDs
const obrigatorio = (campo: string) => z.string().trim().min(1, `Preencha o campo ${campo}`);

const numero = (campo: string, inteiro = false) => obrigatorio(campo).refine((valor) => {
    const convertido = Number(valor);
    return convertido >= 0 && (!inteiro || Number.isInteger(convertido));
}, inteiro ? `Use um número inteiro positivo em ${campo}` : `Use um número positivo em ${campo}`);

export const categoriaSchema = z.object({
    nome: obrigatorio("nome").max(60, "Use até 60 caracteres"),
});

export const materialSchema = z.object({
    categoria_id: obrigatorio("categoria"),
    nome: obrigatorio("nome").max(120, "Use até 120 caracteres"),
    unidade: obrigatorio("unidade").max(10, "Use até 10 caracteres"),
    valor_unitario: numero("valor unitário"),
    estoque_atual: numero("estoque atual", true),
    estoque_minimo: numero("estoque mínimo", true),
});

export const clienteSchema = z.object({
    nome: obrigatorio("nome").max(120, "Use até 120 caracteres"),
    cidade: obrigatorio("cidade").max(80, "Use até 80 caracteres"),
});

export const obraSchema = z.object({
    cliente_id: obrigatorio("cliente"),
    titulo: obrigatorio("título").max(140, "Use até 140 caracteres"),
    status: obrigatorio("status"),
    data_inicio: obrigatorio("data de início"),
});
