import { Campo } from "../componentes/Campo";
import { Formulario } from "../componentes/Formulario";
import { useFormularioRecurso } from "../hooks/useFormularioRecurso";
import { clienteSchema } from "../types/estoque";

export function ClienteFormPage() {
    const { form, erros, erroApi, alterar, salvar, editando } = useFormularioRecurso("clientes", clienteSchema, { nome: "", cidade: "" });

    return (
        <Formulario titulo={editando ? "Editar cliente" : "Novo cliente"} voltarPara="/clientes" erroApi={erroApi} onSubmit={salvar}>
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
            <Campo rotulo="Cidade" valor={form.cidade} erro={erros.cidade?.[0]} onChange={alterar("cidade")} />
        </Formulario>
    )
}
