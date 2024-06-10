export function dateFormatter(rawDate: Date) {
  const date = new Date(rawDate.toString()); // Seu valor Date já existente
  // Formatar a data no formato desejado (dd/MM/yyyy)
  const dia = date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Converter a hora para o fuso horário de Brasília (-3)
  const hora = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return {
    dia,
    hora,
  };
}
