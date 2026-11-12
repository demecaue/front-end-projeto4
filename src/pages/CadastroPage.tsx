import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { api } from "../api/axios";
import { mensagemDeErro } from "../api/erros";
import { Campo } from "../componentes/Campo";
import { Logo } from "../componentes/Logo";
import { usuarioSchema, type Usuario } from "../types/usuario";

type Erros = Partial<Record<keyof Usuario, string[]>>;

export function CadastroPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Usuario>({ nome: "", email: "", senha: "", confirmarSenha: "", cpf: "" });
    const [erros, setErros] = useState<Erros>({});
    const [erroApi, setErroApi] = useState("");

    function alterar(campo: keyof Usuario) {
        return (valor: string) => setForm({ ...form, [campo]: valor });
    }

    async function enviar(event: SubmitEvent) {
        event.preventDefault();
        setErroApi("");
        const resultado = usuarioSchema.safeParse(form);

        if (!resultado.success) {
            setErros(z.flattenError(resultado.error).fieldErrors);
            return;
        }

        setErros({});
        const { confirmarSenha, ...usuario } = resultado.data;

        try {
            await api.post("/usuarios", usuario);
            // Rubrica: redirecionar para o login após o cadastro
            navigate("/login");
        } catch (erro) {
            // Rubrica: lidar com as mensagens de erro da API
            setErroApi(mensagemDeErro(erro));
        }
    }

    return (
        <form className="cartao" onSubmit={enviar} noValidate>
            <Logo />
            <h1>Cadastro</h1>
            <Campo rotulo="Nome" valor={form.nome} erro={erros.nome?.[0]} onChange={alterar("nome")} />
            <Campo rotulo="Email" valor={form.email} erro={erros.email?.[0]} onChange={alterar("email")} />
            <Campo rotulo="Senha" tipo="password" valor={form.senha} erro={erros.senha?.[0]} onChange={alterar("senha")} />
            <Campo rotulo="Confirmar senha" tipo="password" valor={form.confirmarSenha} erro={erros.confirmarSenha?.[0]} onChange={alterar("confirmarSenha")} />
            <Campo rotulo="CPF" valor={form.cpf} erro={erros.cpf?.[0]} onChange={alterar("cpf")} />
            {erroApi && <p className="erro-api" role="alert">{erroApi}</p>}
            <button type="submit">Cadastrar</button>
            <Link to="/login">Já tenho conta</Link>
        </form>
    )
}
