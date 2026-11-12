type Props = {
    pagina: number;
    totalPaginas: number;
    onMudar: (pagina: number) => void;
}

export function Paginacao({ pagina, totalPaginas, onMudar }: Props) {
    return (
        <div className="paginacao">
            <button type="button" disabled={pagina <= 1} onClick={() => onMudar(pagina - 1)}>Anterior</button>
            <span>Página {pagina} de {Math.max(totalPaginas, 1)}</span>
            <button type="button" disabled={pagina >= totalPaginas} onClick={() => onMudar(pagina + 1)}>Próxima</button>
        </div>
    )
}
