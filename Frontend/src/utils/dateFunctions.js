export function formatReleaseDate(date){
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
}

export function formatDate(DateString) {
  const date = new Date(DateString)

  const monthNames =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const year = date.getUTCFullYear()
  const month = monthNames[date.getUTCMonth()]
  const day = date.getUTCDate()

  return `${day} ${month} ${year}`
}
