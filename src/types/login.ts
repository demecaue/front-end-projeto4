import { z } from "zod";
import { emailValido } from "../validators/email";

export const loginSchema = z.object({
    // Rubrica: validação de email (regex) no login
    email: z.string().trim().min(1, "Email obrigatório").refine(emailValido, "Email inválido"),
    senha: z.string().min(1, "Senha obrigatória"),
});

export type Login = z.infer<typeof loginSchema>;

export type UsuarioLogado = {
    nome: string;
    email: string;
};

export type RespostaLogin = {
    token: string;
    usuario: UsuarioLogado;
};
