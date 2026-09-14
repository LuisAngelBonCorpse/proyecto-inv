// =====================================================
// LILI & LUIS — Fotos de la galería
// =====================================================

// Cada entrada representa UNA foto de la galería. Úsala así:
//
//   src           → ruta de la foto, relativa a la carpeta raíz del sitio.
//   alt           → texto alternativo para la foto, que se mostrará
//                   si la imagen no carga o para lectores de pantalla.
//
// Para agregar una foto nueva, copia una línea y cambia sus datos.
// No necesitas tocar ningún otro archivo.

async function loadGalleryPhotos() {
  const GALLERY_PHOTOS = [
    {
      "src": "img/galeria/IMG_20230204_152540.jpg",
      "alt": "Foto de muestra 1 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20230224_232603.jpg",
      "alt": "Foto de muestra 2 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/DSC00439.JPG",
      "alt": "Foto de muestra 3 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20240819_111559.jpg",
      "alt": "Foto de muestra 4 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20241228_203456.jpg",
      "alt": "Foto de muestra 5 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20250101_012038.jpg",
      "alt": "Foto de muestra 6 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20250420_122949.jpg",
      "alt": "Foto de muestra 7 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20250525_162518.jpg",
      "alt": "Foto de muestra 8 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20250817_220813.jpg",
      "alt": "Foto de muestra 9 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG-20260615-WA0022.jpg",
      "alt": "Foto de muestra 10 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-69.jpg",
      "alt": "Foto de muestra 11 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-67.jpg",
      "alt": "Foto de muestra 12 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-47.jpg",
      "alt": "Foto de muestra 13 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-43.jpg",
      "alt": "Foto de muestra 14 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-38.jpg",
      "alt":"Foto de muestra 15 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-29.jpg",
      "alt": "Foto de muestra 16 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-30.jpg",
      "alt": "Foto de muestra 17 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-17.jpg",
      "alt": "Foto de muestra 18 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-20.jpg",
      "alt": "Foto de muestra 19 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-10.jpg",
      "alt": "Foto de muestra 20 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-13.jpg",
      "alt": "Foto de muestra 21 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L-4.jpg",
      "alt": "Foto de muestra 22 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/L&L.jpg",
      "alt": "Foto de muestra 23 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20190210_153845824.jpg",
      "alt": "Foto de muestra 24 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20190228_121943207.jpg",
      "alt": "Foto de muestra 25 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20190406_195652728.jpg",
      "alt": "Foto de muestra 26 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20190418_201800525.jpg",
      "alt": "Foto de muestra 27 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20190824_133635532.jpg",
      "alt": "Foto de muestra 28 (reemplaza con las suyas en img/galeria/)"
    },
    {
      "src": "img/galeria/IMG_20220710_124846.jpg",
      "alt": "Foto de muestra 29 (reemplaza con las suyas en img/galeria/)"
    },
  ];
  return GALLERY_PHOTOS;
}
