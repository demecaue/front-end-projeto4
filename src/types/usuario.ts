import { z } from "zod";
import { cpfValido } from "../validators/cpf";
import { emailValido } from "../validators/email";

// Rubrica: campos obrigatórios nome, email, senha e CPF
export const usuarioSchema = z.object({
    nome: z.string().trim().min(1, "Nome obrigatório"),
    // Rubrica: aplica a validação de email
    email: z.string().trim().min(1, "Email obrigatório").refine(emailValido, "Email inválido"),
    senha: z.string().min(1, "Senha obrigatória"),
    // Rubrica: verificação dupla de senha, comparada no refine abaixo
    confirmarSenha: z.string().min(1, "Confirme a senha"),
    // Rubrica: aplica a validação de CPF
    cpf: z.string().trim().min(1, "CPF obrigatório").refine(cpfValido, "CPF inválido"),
}).refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export type Usuario = z.infer<typeof usuarioSchema>;
