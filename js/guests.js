// =====================================================
// LILI & LUIS — Lista de invitados
// =====================================================
// Cada entrada representa UNA invitación (puede ser una persona,
// una pareja o una familia). Úsala así:
//
//   id            → identificador único, sin espacios ni acentos.
//                   Se usa en el enlace personalizado que le compartas
//                   a cada invitado: tusitio.com/?inv=ESTE-ID
//   nombre        → como se mostrará en el formulario y en el mensaje
//                   de confirmación.
//   acompanantes  → cuántos acompañantes puede traer ESA invitación.
//                   Pon 0 si la invitación es individual/sin acompañantes.
//
// Para agregar un invitado nuevo, copia una línea y cambia sus datos.
// No necesitas tocar ningún otro archivo.
 
const GUESTS = [
  { id: "ana_y_sergio",   nombre: "Familia Luna Durán",         acompanantes: 0 },
  { id: "mama_ana",       nombre: "Ana Angela",                 acompanantes: 1 },
  { id: "balo_y_jaq",     nombre: "Familia Durán Sanchez",      acompanantes: 3 },
  { id: "clau_y_marco",   nombre: "Familia Vazquez Durán",      acompanantes: 4 },
  { id: "papa_yorch",     nombre: "Jorge Gonzales",             acompanantes: 0 },
  { id: "papa_carlos",    nombre: "Carlos Sanchez",             acompanantes: 0 },
  { id: "mama_julia",     nombre: "Julia Soto",                 acompanantes: 0 },
  { id: "chopo_y_sol",    nombre: "Familia Sanchez ",           acompanantes: 2 },
];
 
// -----------------------------------------------------
// Cómo compartir una invitación personalizada:
// Toma la URL de tu sitio publicado y agrégale "?inv=" seguido del id.
// Ejemplo, si tu sitio es https://boda-lili-luis.netlify.app :
//
//   https://boda-lili-luis.netlify.app/?inv=familia-perez
//   https://boda-lili-luis.netlify.app/?inv=carlos-ruiz
//
// Al abrir ese enlace, el formulario mostrará el nombre ya seleccionado
// y bloqueado, con el número correcto de acompañantes habilitado.
// Si alguien entra sin ese parámetro, podrá elegir su nombre de la lista
// desplegable en lugar de escribirlo libremente.
// -----------------------------------------------------
 