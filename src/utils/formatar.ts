export const moeda = (valor: number) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dataBr = (data: string) => data.split("-").reverse().join("/");
