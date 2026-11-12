import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { api } from "../api/axios";
import { mensagemDeErro } from "../api/erros";
import { Campo } from "../componentes/Campo";
import { Logo } from "../componentes/Logo";
import { loginSchema, type Login, type RespostaLogin } from "../types/login";

type Erros = Partial<Record<keyof Login, string[]>>;

export function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Login>({ email: "", senha: "" });
    const [erros, setErros] = useState<Erros>({});
    const [erroApi, setErroApi] = useState("");

    function alterar(campo: keyof Login) {
        return (valor: string) => setForm({ ...form, [campo]: valor });
    }

    async function entrar(event: SubmitEvent) {
        event.preventDefault();
        setErroApi("");
        const resultado = loginSchema.safeParse(form);

        if (!resultado.success) {
            setErros(z.flattenError(resultado.error).fieldErrors);
            return;
        }

        setErros({});

        try {
            const { data } = await api.post<RespostaLogin>("/login", resultado.data);
            // Rubrica: armazenar o token no localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            // Rubrica: redirecionar para a área logada
            navigate("/inicio");
        } catch (erro) {
            // Rubrica: lidar com os erros da API de forma amigável para o usuário
            setErroApi(mensagemDeErro(erro));
        }
    }

    return (
        <form className="cartao" onSubmit={entrar} noValidate>
            <Logo />
            <h1>Login</h1>
            {/* Rubrica: campos para email e senha */}
            <Campo rotulo="Email" valor={form.email} erro={erros.email?.[0]} onChange={alterar("email")} />
            <Campo rotulo="Senha" tipo="password" valor={form.senha} erro={erros.senha?.[0]} onChange={alterar("senha")} />
            {erroApi && <p className="erro-api" role="alert">{erroApi}</p>}
            <button type="submit">Entrar</button>
            <Link to="/cadastro">Criar conta</Link>
        </form>
    )
}
