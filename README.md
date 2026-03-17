# Vipal S.A. - Sitio Web Corporativo

Sitio web profesional para **Vipal S.A. (Fingertips Solutions)** construido con:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Arquitectura modular y escalable
- Tema claro/oscuro con persistencia

## Estructura principal

```txt
src/
  app/
  components/
    layout/
    home/
    services/
    contact/
    shared/
    ui/
    projects/
  data/
  lib/
  types/
```

## Funcionalidades incluidas

- Home corporativo premium orientado a conversion
- Pagina Nosotros con mision, vision y valores
- Pagina principal de servicios con grid reutilizable
- Rutas dinamicas para detalle de cada servicio (`/servicios/[slug]`)
- Galeria de proyectos con filtros y vista ampliada
- Pagina de contacto/cotizacion con formulario listo para integrar backend
- FAQ con acordeon interactivo
- Navbar sticky, menu responsive y footer completo
- Boton flotante de WhatsApp
- SEO base por pagina + Open Graph + sitemap + robots

## Datos de negocio

La informacion principal esta centralizada en `src/data/`:

- `company.ts`
- `services.ts`
- `projects.ts`
- `testimonials.ts`
- `faq.ts`

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar entorno de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador:

```txt
http://localhost:3000
```

## Build de produccion

```bash
npm run build
npm run start
```

## Notas de escalabilidad

- El contenido es **data-driven** para facilitar integracion futura con CMS/API.
- Los componentes son reutilizables y se separan por dominio.
- El formulario de contacto esta preparado para conectarse a backend, email service o CRM.
