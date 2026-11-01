import { z } from "zod";

export const usuarioSchema = z.object({
    nome: z.string().trim().min(1, "Nome obrigatório"),
    email: z.string().trim().min(1, "Email obrigatório"),
    senha: z.string().min(1, "Senha obrigatória"),
    cpf: z.string().trim().min(1, "CPF obrigatório"),
});

export type Usuario = z.infer<typeof usuarioSchema>;
