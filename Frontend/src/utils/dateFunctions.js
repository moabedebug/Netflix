export function formatReleaseDate(date){
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
}
