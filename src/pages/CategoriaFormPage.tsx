import { Campo } from "../componentes/Campo";
import { Formulario } from "../componentes/Formulario";
import { useFormularioRecurso } from "../hooks/useFormularioRecurso";
import { categoriaSchema } from "../types/estoque";

export function CategoriaFormPage() {
    const { form, erros, erroApi, alterar, salvar, editando } = useFormularioRecurso("categorias", categoriaSchema, { nome: "" });

    return (
        <Formulario titulo={editando ? "Editar categoria" : "Nova categoria"} voltarPara="/categorias" erroApi={erroApi} onSubmit={salvar}>
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
        </Formulario>
    )
}
