import { Campo } from "../componentes/Campo";
import { Formulario } from "../componentes/Formulario";
import { Selecao } from "../componentes/Selecao";
import { useFormularioRecurso } from "../hooks/useFormularioRecurso";
import { useOpcoes } from "../hooks/useOpcoes";
import { obraSchema, statusObra } from "../types/estoque";

const opcoesStatus = Object.entries(statusObra).map(([valor, texto]) => ({ valor, texto }));

export function ObraFormPage() {
    const clientes = useOpcoes("clientes");
    const { form, erros, erroApi, alterar, salvar, editando } = useFormularioRecurso("obras", obraSchema, {
        cliente_id: "", titulo: "", status: "EM_ANDAMENTO", data_inicio: "",
    });

    return (
        <Formulario titulo={editando ? "Editar obra" : "Nova obra"} voltarPara="/obras" erroApi={erroApi} onSubmit={salvar}>
            <Selecao rotulo="Cliente" valor={form.cliente_id} opcoes={clientes} erro={erros.cliente_id?.[0]} onChange={alterar("cliente_id")} />
            <Campo rotulo="Título" valor={form.titulo} erro={erros.titulo?.[0]} onChange={alterar("titulo")} />
            <Selecao rotulo="Status" valor={form.status} opcoes={opcoesStatus} erro={erros.status?.[0]} onChange={alterar("status")} />
            <Campo rotulo="Data de início" tipo="date" valor={form.data_inicio} erro={erros.data_inicio?.[0]} onChange={alterar("data_inicio")} />
        </Formulario>
    )
}
