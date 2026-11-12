import axios from "axios";

export function mensagemDeErro(erro: unknown) {
    const mensagem = axios.isAxiosError<{ mensagem?: string }>(erro) && erro.response?.data?.mensagem;
    return mensagem || "Não foi possível conectar ao servidor";
}
