import { z } from "zod";
import { cpfValido } from "../validators/cpf";

export const usuarioSchema = z.object({
    nome: z.string().trim().min(1, "Nome obrigatório"),
    email: z.string().trim().min(1, "Email obrigatório"),
    senha: z.string().min(1, "Senha obrigatória"),
    confirmarSenha: z.string().min(1, "Confirme a senha"),
    cpf: z.string().trim().min(1, "CPF obrigatório").refine(cpfValido, "CPF inválido"),
}).refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export type Usuario = z.infer<typeof usuarioSchema>;
