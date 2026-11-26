# kit.andresrendon.com

Web del kit de Vice City Diario: recursos gratis para crear Shorts con IA y oferta de web 3D.

**Cada cambio que se sube a `main` se publica solo** en https://kit.andresrendon.com (Cloudflare Pages, sin paso de compilación: la carpeta raíz es la web tal cual).

## Cambios habituales

- **Plazas de la oferta 99,99 €:** en `index.html`, busca `<div ... id="promo" data-total="10" data-libres="10">` y baja `data-libres` cada vez que vendas una. Con `0`, la web pasa sola a 799 € y oculta la banda y la barra del móvil. No vuelvas a subirlo.
- **Recursos gratis:** el array `RECURSOS` en `index.html` y las páginas de `recursos/`.
- **Cabeceras:** `_headers`.

## Cómo se publica

GitHub `urieln8n/kit-andresrendon` (rama `main`) → Cloudflare Pages, proyecto `kit-andresrendon-web` → https://kit.andresrendon.com. Cada commit en `main` se publica sola en 1–2 minutos; las otras ramas generan una vista previa en `*.kit-andresrendon-web.pages.dev`.
