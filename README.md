# Seguros KR — proyecto terminado

Sitio estático completo en español (Colombia). Incluye el logo KR geométrico actualizado, siete fotografías, seis líneas de seguros, directorio médico, teléfonos SURA y contacto por WhatsApp.

## Usar en Antigravity

1. Descomprime el ZIP y abre esta carpeta como proyecto.
2. El contenido que debes publicar está en **dist/**. No requiere instalación de paquetes ni compilación.
3. Usa tu proveedor y las credenciales que ya tienes configuradas. El paquete no está vinculado a Sites ni incluye credenciales o historial Git.
4. Cuando conozcas la URL final, actualiza los metadatos con el comando indicado abajo.
5. Publica el **contenido de dist/** en la raíz del alojamiento: index.html debe estar en la raíz del sitio.

Directorio de publicación: `dist`. Comando de compilación: ninguno. Backend y variables secretas: no necesarios.

## Dominio y SEO

Los metadatos conservan inicialmente la URL de revisión anterior. Antes del despliegue definitivo, ejecuta desde la raíz del proyecto:

```bash
node scripts/configurar-dominio.mjs https://tu-dominio.com
```

Sustituye el dominio del ejemplo por el real. El comando actualiza canonical, Open Graph y Organization. Publica de nuevo después de cambiarlo. Está preparado para alojarse en la raíz del dominio.

## Vista previa local

```bash
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abre http://127.0.0.1:4173. Detén el servidor con Ctrl+C.

## Editar

- `dist/index.html`: textos, planes, enlaces, SEO y datos estructurados.
- `dist/assets/styles.css`: paleta, tipografía, tamaños y diseño responsive.
- `dist/assets/main.js`: menú, animaciones y selector del seguro.
- `dist/assets/logo.svg` y `logo-light.svg`: monograma KR azul y blanco.
- `dist/assets/img/`: siete fotografías optimizadas. Son escenas ilustrativas generadas con IA; sus prompts están en PROMPTS.txt.
- `FUENTES.md`: referencias oficiales y precisiones de los planes.

WhatsApp: **573128589533**. Para cambiarlo, reemplázalo en index.html y main.js; actualiza también los teléfonos visibles, enlaces tel y Organization. El mensaje del hero y botón flotante es exactamente “Estoy interesado en un Seguro”.

La tipografía Manrope se carga desde Google Fonts; Arial es la alternativa. No se incluyen formularios, backend ni analítica.

## Verificación realizada

Versión revisada en navegador a 1440, 768 y 390 px. Menú móvil, desplegables, imágenes y enlaces internos comprobados; el selector de interés genera el mensaje de WhatsApp correspondiente. Logo actualizado revisado en escritorio y móvil. La configuración y las credenciales del proveedor de destino deben verificarse en Antigravity al desplegar.
