import { z } from "zod";
import { cpfValido } from "../validators/cpf";
import { nivelSenha } from "../validators/senha";

export const perfilSchema = z.object({
    nome: z.string().trim().min(1, "Nome obrigatório"),
    // Rubrica: validação de nível de senha na edição
    senha: z.string().min(1, "Senha obrigatória")
        .refine((senha) => nivelSenha(senha) !== "fraca", "Senha fraca: use 8 caracteres e 3 tipos entre minúscula, maiúscula, número e símbolo"),
    confirmarSenha: z.string().min(1, "Confirme a senha"),
    // Rubrica: validação de CPF na edição
    cpf: z.string().trim().min(1, "CPF obrigatório").refine(cpfValido, "CPF inválido"),
// Rubrica: confirmação da senha na edição
}).refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
});

export type Perfil = z.infer<typeof perfilSchema>;
