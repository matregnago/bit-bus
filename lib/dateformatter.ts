export function dateFormatter(rawDate: Date) {
  const date = new Date(rawDate.toString()); // Seu valor Date já existente

  const dia = String(date.getUTCDate()).padStart(2, "0");
  const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Os meses são indexados a partir de 0
  const ano = date.getUTCFullYear();

  // Formata a hora e os minutos
  const hora = String(date.getUTCHours()).padStart(2, "0");
  const minutos = String(date.getUTCMinutes()).padStart(2, "0");
  console.log(date);
  // Monta o objeto resultante
  return {
    dia: `${dia}/${mes}/${ano}`,
    hora: `${hora}:${minutos}`,
  };
}
