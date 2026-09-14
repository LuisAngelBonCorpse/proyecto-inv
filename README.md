# Lili & Luis — Sitio de la boda

Sitio estático (HTML + CSS + JS puro, sin frameworks ni build tools). Basta con abrir `index.html` en el navegador para verlo funcionando.

## Estructura

```
boda-lili-luis/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Qué personalizar antes de publicarlo

1. **Fecha de la boda** — en `js/script.js`, busca `WEDDING_DATE` y ajusta la fecha/hora si es necesario.
2. **Fotos de la galería** — actualmente usa imágenes de ejemplo de `picsum.photos`. Crea una carpeta `img/galeria/` con tus fotos reales y reemplaza los `src` en la sección `<section id="galeria">` de `index.html`.
3. **Textos** — "Nuestra historia", "Agradecimientos", "El gran día" y "Mesa de regalos" tienen texto de ejemplo (marcado como tal) listo para que lo sustituyas por el contenido real.
4. **Formulario RSVP** — funciona visualmente, pero no guarda las respuestas todavía. Para que sí lo haga, sin necesidad de programar un backend, tienes estas opciones gratuitas:
   - [Formspree](https://formspree.io) — cambia el atributo `action` del `<form>` en `index.html` por la URL que te den, y ya funciona sin tocar el JS.
   - [Web3Forms](https://web3forms.com) — similar, gratis.
   - Un formulario de Google Forms embebido en lugar del formulario actual.

   Hay una nota en `index.html` (justo antes del `<form>`) y otra en `js/script.js` (dentro de `initRsvpForm`) señalando exactamente dónde hacer el cambio.

## Cómo hospedarlo gratis

Cualquiera de estas opciones sirve directamente para una carpeta de HTML/CSS/JS sin build:

- **Netlify** — arrastra la carpeta completa en [app.netlify.com/drop](https://app.netlify.com/drop). Además, Netlify puede procesar el formulario RSVP de forma nativa si le agregas el atributo `data-netlify="true"` al `<form>`, sin necesidad de Formspree.
- **GitHub Pages** — sube la carpeta a un repositorio y activa Pages en la configuración del repo.
- **Vercel** o **Cloudflare Pages** — igualmente compatibles, arrastrando o conectando el repositorio.

## Desarrollo local

No requiere instalar nada. Si quieres evitar problemas de rutas relativas, puedes servirlo con cualquier servidor estático simple, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000`.
