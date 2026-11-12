import { Campo } from "../componentes/Campo";
import { Formulario } from "../componentes/Formulario";
import { Selecao } from "../componentes/Selecao";
import { useFormularioRecurso } from "../hooks/useFormularioRecurso";
import { useOpcoes } from "../hooks/useOpcoes";
import { materialSchema } from "../types/estoque";

const vazio = { categoria_id: "", nome: "", unidade: "", valor_unitario: "", estoque_atual: "", estoque_minimo: "" };

export function MaterialFormPage() {
    const categorias = useOpcoes("categorias");
    const { form, erros, erroApi, alterar, salvar, editando } = useFormularioRecurso("materiais", materialSchema, vazio);

    return (
        <Formulario titulo={editando ? "Editar material" : "Novo material"} voltarPara="/materiais" erroApi={erroApi} onSubmit={salvar}>
            <Selecao rotulo="Categoria" valor={form.categoria_id} opcoes={categorias} erro={erros.categoria_id?.[0]} onChange={alterar("categoria_id")} />
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
            <Campo rotulo="Unidade (m, un, br)" valor={form.unidade} erro={erros.unidade?.[0]} onChange={alterar("unidade")} />
            <Campo rotulo="Valor unitário (R$)" valor={form.valor_unitario} erro={erros.valor_unitario?.[0]} onChange={alterar("valor_unitario")} />
            <Campo rotulo="Estoque atual" tipo="number" valor={form.estoque_atual} erro={erros.estoque_atual?.[0]} onChange={alterar("estoque_atual")} />
            <Campo rotulo="Estoque mínimo" tipo="number" valor={form.estoque_minimo} erro={erros.estoque_minimo?.[0]} onChange={alterar("estoque_minimo")} />
        </Formulario>
    )
}
