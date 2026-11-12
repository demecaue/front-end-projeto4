import { useEffect, useState, type SubmitEvent } from "react";
import { z } from "zod";
import { api } from "../api/axios";
import { mensagemDeErro } from "../api/erros";
import { Campo } from "../componentes/Campo";
import { useUsuario } from "../contexto/UsuarioContexto";
import { perfilSchema, type Perfil } from "../types/perfil";

type Erros = Partial<Record<keyof Perfil, string[]>>;

export function PerfilPage() {
    const { usuario, atualizar } = useUsuario();
    const [form, setForm] = useState<Perfil>({ nome: "", senha: "", confirmarSenha: "", cpf: "" });
    const [erros, setErros] = useState<Erros>({});
    const [erroApi, setErroApi] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        if (!usuario) return;
        api.get<Perfil>(`/usuarios/${usuario.id}`)
            .then(({ data }) => setForm((atual) => ({ ...atual, nome: data.nome, cpf: data.cpf })))
            .catch((erro) => setErroApi(mensagemDeErro(erro)));
    }, [usuario?.id]);

    function alterar(campo: keyof Perfil) {
        return (valor: string) => setForm({ ...form, [campo]: valor });
    }

    async function salvar(event: SubmitEvent) {
        event.preventDefault();
        setErroApi("");
        setSucesso("");
        const resultado = perfilSchema.safeParse(form);

        if (!resultado.success) {
            setErros(z.flattenError(resultado.error).fieldErrors);
            return;
        }

        setErros({});
        if (!usuario) return;
        const { confirmarSenha, ...dados } = resultado.data;

        try {
            await api.put(`/usuarios/${usuario.id}`, dados);
            atualizar({ ...usuario, nome: dados.nome });
            setForm({ ...form, senha: "", confirmarSenha: "" });
            setSucesso("Dados atualizados");
        } catch (erro) {
            setErroApi(mensagemDeErro(erro));
        }
    }

    return (
        <form className="cartao" onSubmit={salvar} noValidate>
            <h1>Meus dados</h1>
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
            {/* Rubrica: não permitir que o usuário altere o email */}
            <Campo rotulo="Email" valor={usuario?.email ?? ""} desabilitado />
            <Campo rotulo="Nova senha" tipo="password" valor={form.senha} erro={erros.senha?.[0]} onChange={alterar("senha")} />
            <Campo rotulo="Confirmar senha" tipo="password" valor={form.confirmarSenha} erro={erros.confirmarSenha?.[0]} onChange={alterar("confirmarSenha")} />
            <Campo rotulo="CPF" valor={form.cpf} erro={erros.cpf?.[0]} onChange={alterar("cpf")} />
            {erroApi && <p className="erro-api" role="alert">{erroApi}</p>}
            {sucesso && <p className="sucesso" role="status">{sucesso}</p>}
            <button type="submit">Salvar</button>
        </form>
    )
}
