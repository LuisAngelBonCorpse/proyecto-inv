// =====================================================
// LILI & LUIS — Nuestra boda — script.js
// Todo el sitio funciona sin backend. El único punto que
// requiere un servicio externo es el envío real del RSVP
// (ver comentario en la sección "RSVP" más abajo).
// =====================================================

document.addEventListener('DOMContentLoaded', async () => {
  initCountdown();
  initNav();
  initRevealOnScroll();
  initVineSpine();
  const galleryPhotos = await loadGalleryPhotos();
  const galleryInfo = buildGalleryPages(galleryPhotos);
  initGalleryCarousel(galleryInfo.pages);
  initGalleryLightbox();
  initGuestList();
  initPadrinos();
  initMadrinas();
  initRsvpForm();
  initMusicPlayer();
});

/* ---------- Contador regresivo ---------- */
function initCountdown() {
  // Cambia esta fecha si la fecha de la boda cambia.
  const WEDDING_DATE = new Date('2027-02-05T16:00:00');

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function update() {
    const now = new Date();
    let diff = WEDDING_DATE - now;

    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.minutes.textContent = String(minutes).padStart(2, '0');
    els.seconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ---------- Navegación (fondo al hacer scroll + menú móvil) ---------- */
function initNav() {
  const topnav = document.getElementById('topnav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    topnav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Animación de aparición al hacer scroll ---------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(el => observer.observe(el));
}

/* ---------- Vid dorada que "crece" con el scroll ---------- */
function initVineSpine() {
  const path = document.querySelector('.vine-path');
  if (!path) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = String(length);
  path.style.strokeDashoffset = String(length);

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    path.style.strokeDashoffset = String(length * (1 - progress));
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
/* ---------- Galería: genera una diapositiva por foto ---------- */
function buildGalleryPages(galleryPhotos) {
  const track = document.getElementById('galleryTrack');
  if (!track || !galleryPhotos.length) {
    return { pages: 0 };
  }

  const totalPages = galleryPhotos.length;

  for (let p = 0; p < totalPages; p++) {
    const page = document.createElement('div');
    page.className = 'gallery';

    const photo = galleryPhotos[p];
    const btn = document.createElement('button');
    btn.className = 'gallery-item';
    btn.type = 'button';
    btn.dataset.index = String(p);

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = p === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';

    btn.appendChild(img);
    page.appendChild(btn);

    track.appendChild(page);
  }

  return { pages: totalPages };
}
/* ---------- Galería: navegación del carrusel (flechas, puntos, scroll nativo) ---------- */
function initGalleryCarousel(totalPages) {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsWrap = document.getElementById('galleryDots');
  if (!track || !prevBtn || !nextBtn) return;

  if (totalPages <= 1) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
    return;
  }

  let current = 0;
  const pages = Array.from(track.children);

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery-dot';
    dot.setAttribute('aria-label', `Ir a la página ${i + 1} de fotos`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = Array.from(dotsWrap.children);

  function setCurrent(index) {
    current = index;
    pages.forEach((page, i) => {
      page.setAttribute('aria-hidden', String(i !== current));
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === totalPages - 1;
  }

  function goTo(index) {
    const clamped = Math.max(0, Math.min(totalPages - 1, index));
    pages[clamped].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    // setCurrent() se actualiza solo, ver el IntersectionObserver de abajo.
  }

  // Detecta qué página está realmente visible, sin importar si llegaste
  // ahí con las flechas, deslizando con el dedo o con el trackpad.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const index = pages.indexOf(entry.target);
        if (index !== -1 && index !== current) setCurrent(index);
      }
    });
  }, { root: track, threshold: [0.6] });

  pages.forEach((page) => observer.observe(page));

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  setCurrent(0);
}

/* ---------- Galería: lightbox (navega entre TODAS las fotos, sin importar la página) ---------- */
function initGalleryLightbox() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const galleryTrack = document.getElementById('galleryTrack');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!items.length || !lightbox) return;

  let currentIndex = 0;
  let lastTrigger = null;

  function open(index, triggerEl) {
    currentIndex = index;
    if (triggerEl) lastTrigger = triggerEl;

    const img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.src.replace('/600/', '/1200/');
    lightboxImg.alt = img.alt;

    lightbox.classList.add('is-open');
    lightbox.removeAttribute('aria-hidden');
    lightbox.inert = false;
    closeBtn.focus();
  }

  function close() {
    // El foco debe salir del lightbox ANTES de marcarlo como oculto,
    // o el navegador bloquea el aria-hidden (y con razón: un lector de
    // pantalla no debe perder de vista un elemento enfocado).
    if (lightbox.contains(document.activeElement)) {
      document.activeElement.blur();
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    }
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.inert = true;
    galleryTrack?.classList.remove('is-clipped');
  }

  function show(delta) {
    currentIndex = (currentIndex + delta + items.length) % items.length;
    open(currentIndex);
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index, item));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(-1));
  nextBtn.addEventListener('click', () => show(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
}

/* ---------- Lista de invitados: nombre + acompañantes por invitación ---------- */
function initGuestList() {
  const select = document.getElementById('nombre');
  const hiddenNombre = document.getElementById('nombreHidden');
  const hiddenId = document.getElementById('invitadoId');
  const nombreNote = document.getElementById('nombreNote');
  const acompanantesInput = document.getElementById('acompanantes');
  const acompanantesNote = document.getElementById('acompanantesNote');

  if (!select || typeof GUESTS === 'undefined') return;

  // Rellena el desplegable con la lista de invitados (js/guests.js).
  GUESTS.forEach((guest) => {
    const option = document.createElement('option');
    option.value = guest.id;
    option.textContent = guest.nombre;
    select.appendChild(option);
  });

  function applyGuest(guest) {
    if (!guest) {
      hiddenNombre.value = '';
      hiddenId.value = '';
      acompanantesInput.value = 0;
      acompanantesInput.max = 0;
      acompanantesInput.readOnly = true;
      acompanantesNote.textContent = 'Selecciona tu nombre para ver cuántos acompañantes puedes traer.';
      acompanantesNote.classList.remove('is-locked');
      return;
    }

    hiddenNombre.value = guest.nombre;
    hiddenId.value = guest.id;

    if (guest.acompanantes && guest.acompanantes > 0) {
      // Esta invitación sí tiene acompañantes asignados: se habilita el campo.
      acompanantesInput.readOnly = false;
      acompanantesInput.max = guest.acompanantes;
      if (Number(acompanantesInput.value) > guest.acompanantes) {
        acompanantesInput.value = guest.acompanantes;
      }
      const plural = guest.acompanantes > 1 ? 'acompañantes' : 'acompañante';
      acompanantesNote.textContent = `Puedes traer hasta ${guest.acompanantes} ${plural}.`;
      acompanantesNote.classList.remove('is-locked');
    } else {
      // Sin acompañantes asignados: se deja en 0 y bloqueado, para evitar
      // malentendidos sobre cuántas personas puede llevar el invitado.
      acompanantesInput.value = 0;
      acompanantesInput.max = 0;
      acompanantesInput.readOnly = true;
      acompanantesNote.textContent = 'Esta invitación no incluye acompañantes.';
      acompanantesNote.classList.add('is-locked');
    }
  }

  // Si la invitación llega con un enlace personalizado (?inv=id), el
  // nombre se autocompleta y se bloquea para que no pueda cambiarse.
  const params = new URLSearchParams(window.location.search);
  const invId = params.get('inv');
  const matched = GUESTS.find((g) => g.id === invId);

  if (matched) {
    select.value = matched.id;
    select.disabled = true;
    nombreNote.textContent = `Esta invitación es exclusiva para ${matched.nombre}.`;
    nombreNote.classList.add('is-locked');
    applyGuest(matched);
  } else {
    nombreNote.textContent = 'Elige tu nombre de la lista.';
    applyGuest(null);
  }

  // Modo sin enlace: el invitado elige su nombre del desplegable.
  select.addEventListener('change', () => {
    const guest = GUESTS.find((g) => g.id === select.value);
    applyGuest(guest);
  });

  // Resguardo por si el navegador permite tocar el número con readonly activo.
  acompanantesInput.addEventListener('input', () => {
    if (acompanantesInput.readOnly) acompanantesInput.value = 0;
  });

  // Al reiniciar el formulario tras enviar, vuelve a dejar todo en el
  // estado correcto (bloqueado si venía de un enlace, o vacío si no).
  const form = select.closest('form');
  if (form) {
    form.addEventListener('reset', () => {
      setTimeout(() => {
        if (matched) {
          select.value = matched.id;
          applyGuest(matched);
        } else {
          select.value = '';
          applyGuest(null);
        }
      }, 0);
    });
  }
}

/* ---------- Padrinos: pinta la lista desde js/padrinos.js ---------- */
function initPadrinos() {
  const list = document.getElementById('padrinosList');
  if (!list || typeof PADRINOS === 'undefined') return;

  PADRINOS.forEach((padrino) => {
    const item = document.createElement('li');
    item.className = 'padrino-item';

    item.innerHTML = `
      <span class="padrino-icon" aria-hidden="true">${padrino.icono}</span>
      <span>
        <p class="padrino-nombre">${padrino.nombre}</p>
        <p class="padrino-rol">${padrino.rol}</p>
      </span>
    `;

    list.appendChild(item);
  });
}

/* ---------- Madrinas: pinta la lista desde js/madrinas.js ---------- */
function initMadrinas() {
  const list = document.getElementById('madrinasList');
  if (!list || typeof MADRINA === 'undefined') return;

  MADRINA.forEach((madrina) => {
    const item = document.createElement('li');
    item.className = 'padrino-item';

    item.innerHTML = `
      <span class="padrino-icon" aria-hidden="true">${madrina.icono}</span>
      <span>
        <p class="padrino-nombre">${madrina.nombre}</p>
        <p class="padrino-rol">${madrina.rol}</p>
      </span>
    `;

    list.appendChild(item);
  });
}

/* ---------- Reproductor de música (tocadiscos) ---------- */
function initMusicPlayer() {
  const btn = document.getElementById('recordBtn');
  const audio = document.getElementById('bgAudio');
  if (!btn || !audio) return;

  audio.volume = 0.3; // Ajusta el volumen inicial según tu preferencia.

  function setPlaying(isPlaying) {
    btn.classList.toggle('is-playing', isPlaying);
    btn.setAttribute('aria-pressed', String(isPlaying));
    btn.setAttribute('aria-label', isPlaying ? 'Pausar nuestra canción' : 'Reproducir nuestra canción');
  }

  btn.addEventListener('click', () => {
    if (audio.paused) {
      // Reproducir requiere un gesto del usuario (este click lo es).
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // No se encontró el archivo de audio o el navegador lo bloqueó.
          // Revisa que exista audio/nuestra-cancion.mp3 (ver README.md).
          setPlaying(false);
        });
    } else {
      audio.pause();
    }
  });

  // Mantiene el disco y el brazo sincronizados si la canción se
  // pausa/reanuda o termina por cualquier otro motivo (no solo el clic).
  audio.addEventListener('play', () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('ended', () => setPlaying(false));
}
/* ---------- Formulario de confirmación (RSVP) ---------- */
function initRsvpForm() {
  const form = document.getElementById('rsvpForm');
  const feedback = document.getElementById('formFeedback');
  const albumReveal = document.getElementById('albumReveal');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreHidden').value;
    if (!nombre) {
      feedback.textContent = 'Selecciona tu nombre de la lista antes de confirmar.';
      return;
    }

    const asistenciaInput = form.querySelector('input[name="asistencia"]:checked');
    const asiste = asistenciaInput && asistenciaInput.value === 'si';


    // ------------------------------------------------------------------
    // Este bloque solo simula el envío en el navegador. Para guardar las
    // confirmaciones de verdad, conecta el formulario a un servicio
    // gratuito (Formspree, Web3Forms, Google Forms, etc.) y sustituye
    // este bloque por un fetch() real hacia ese endpoint, por ejemplo:
    //
    // fetch(form.action, { method: 'POST', body: new FormData(form) })
    //   .then(() => feedback.textContent = '¡Gracias por confirmar!');
    //
    // El FormData ya incluirá "nombre" e "invitado_id" gracias a los
    // campos ocultos, aunque el <select> visible esté deshabilitado.
    // ------------------------------------------------------------------

    feedback.textContent = `¡Gracias, ${nombre}! Tu confirmación fue registrada.`;

    // El QR del álbum solo se revela a quienes sí van a asistir.
    if (albumReveal) {
      if (asiste) {
        albumReveal.hidden = false;
        // Pequeño respiro para que la transición de aparición se note.
        requestAnimationFrame(() => albumReveal.classList.add('is-visible'));
      } else {
        albumReveal.classList.remove('is-visible');
        albumReveal.hidden = true;
      }
    }
    form.reset();
  });
}

/* Nuestra historia en parrafos dinamicos para mantener el tamaño controlado */
const LIMITE = 200;

const parrafos = [
  "Todo empezó con un plato de ramen humeante y un cruce de miradas que ni el destino se esperaba (ni nosotros, la verdad). No hubo tiempo para eso de \"seamos amigos primero\" —cuando lo sabes, lo sabes, y punto—, así que en una semana ya éramos novios oficiales, saltándonos como buenos rebeldes el manual del amor tradicional. Desde entonces nos convertimos en coautores de nuestra propia historia: noches eternas de mensajes de texto que hacían que el sueño esperara su turno, risas que dolían el estómago, hobbies compartidos (y otros que uno fingía que le encantaban) y, sobre todo, esa complicidad que solo se encuentra cuando alguien te ve raro comiendo ramen y decide quedarse de todos modos.",
  "Y como primer destino juntos elegimos Zihuatanejo: sol, playa, un vinito y nosotros dos haciéndonos los turistas expertos sin tener ni idea de nada. Bastaron unos días para confirmar lo que ya sospechábamos —que somos el dúo perfecto de compañeros de aventuras, de esos que se pierden en el mapa pero nunca se pierden el uno al otro—. Y eso, queridos lectores, fue solo el comienzo de una lista interminable de destinos recorridos, maletas mal hechas y fotos donde uno de los dos siempre sale con los ojos cerrados.",
  "Y después de años esquivando el reto máximo de toda pareja —eso de \"juntar las navidades\"— por fin llegó el año en que nos aventamos el clavado completo: Nochebuena con una familia, en pijamas de dragones incluidas (porque el amor verdadero también se demuestra en algodón y estampado de escamas), y Año Nuevo con la otra, ahora sí en nuestras mejores galas, cumpliendo religiosamente cada ritual de buena suerte para nuestro nidito —de esos que uno hace medio en broma pero igual cumple por si las dudas—. Y contra todo pronóstico, ambas fueron un éxito rotundo, demostrando que sí se puede sobrevivir a dos navidades sin generar una crisis diplomática.",
  "La propuesta empezó a planearse desde el momento exacto en que a ella se le empezaron a iluminar los ojos con cada propuesta de película o serie —esa mirada de \"algún día a mí también\"—. Ahí hizo clic todo (literal y figuradamente) y la operación secreta dio inicio. Primero el lugar: con el sigilo de un espía profesional se investigó que la vista desde Reforma hacia el Castillo de Chapultepec era, sin lugar a dudas, la indicada. Después vinieron las canciones, esas que sonaron de fondo en los momentos que hicieron única e irrepetible nuestra historia. Y como si fuera poco, la suma de todo eso —meses de planeación disfrazados de \"no pasa nada, todo normal\"— se transformó en una sorpresa con un Lego armado a mano y una rosa que, sorpresa, no era rosa. El resultado: la propuesta perfecta, y el que hasta el más despistado del cuento lograra guardar el secreto sin arruinarlo."
];

const contenedor0 = document.getElementById('contenedor0');
const contenedor1 = document.getElementById('contenedor1');
const contenedor2 = document.getElementById('contenedor2');
const contenedor3 = document.getElementById('contenedor3');

parrafos.forEach((texto, index) => {
  const p = document.createElement('p');
  p.className = 'parrafo';
  p.id = 'parrafo-' + index;

  if (texto.length <= LIMITE) {
    p.textContent = texto;
  } else {
    const corto = texto.slice(0, LIMITE).trimEnd() + '...     ';
    p.innerHTML = '<span class="texto">' + corto + '</span> <span class="ver-mas" onclick="toggleTexto(' + index + ')">ver más</span>';
  }

  if (index === 0) {
    contenedor0.appendChild(p);
  } else if (index === 1) {
    contenedor1.appendChild(p);
  } else if (index === 2) {
    contenedor2.appendChild(p);
  } else {
    contenedor3.appendChild(p);
  }

});

function toggleTexto(index) {
  const p = document.getElementById('parrafo-' + index);
  const textoCompleto = parrafos[index];
  const spanTexto = p.querySelector('.texto');
  const spanBoton = p.querySelector('.ver-mas');

  const expandido = spanBoton.textContent === 'ver menos';

  if (expandido) {
    spanTexto.textContent = textoCompleto.slice(0, LIMITE).trimEnd() + '...';
    spanBoton.textContent = 'ver más';
  } else {
    spanTexto.textContent = textoCompleto;
    spanBoton.textContent = 'ver menos';
  }
} 