import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import { api } from "../api/axios";
import { Campo } from "../componentes/Campo";
import { usuarioSchema, type Usuario } from "../types/usuario";

type Erros = Partial<Record<keyof Usuario, string[]>>;

export function CadastroPage() {
    const [form, setForm] = useState<Usuario>({ nome: "", email: "", senha: "", confirmarSenha: "", cpf: "" });
    const [erros, setErros] = useState<Erros>({});

    function alterar(campo: keyof Usuario) {
        return (valor: string) => setForm({ ...form, [campo]: valor });
    }

    async function enviar(event: SubmitEvent) {
        event.preventDefault();
        const resultado = usuarioSchema.safeParse(form);

        if (!resultado.success) {
            setErros(z.flattenError(resultado.error).fieldErrors);
            return;
        }

        setErros({});
        const { confirmarSenha, ...usuario } = resultado.data;
        await api.post("/usuarios", usuario);
    }

    return (
        <form className="cadastro" onSubmit={enviar} noValidate>
            <h1>Cadastro</h1>
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
            <Campo rotulo="Email" valor={form.email} erro={erros.email?.[0]} onChange={alterar("email")} />
            <Campo rotulo="Senha" tipo="password" valor={form.senha} erro={erros.senha?.[0]} onChange={alterar("senha")} />
            <Campo rotulo="Confirmar senha" tipo="password" valor={form.confirmarSenha} erro={erros.confirmarSenha?.[0]} onChange={alterar("confirmarSenha")} />
            <Campo rotulo="CPF" valor={form.cpf} erro={erros.cpf?.[0]} onChange={alterar("cpf")} />
            <button type="submit">Cadastrar</button>
        </form>
    )
}
