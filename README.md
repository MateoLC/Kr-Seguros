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
node scripts/servidor-local.mjs 4187
```

Abre http://127.0.0.1:4187. Este servidor admite rangos HTTP para saltar entre las escenas del video. Detén el servidor con Ctrl+C.

## Editar

- `dist/index.html`: textos, planes, enlaces, SEO y datos estructurados.
- `dist/assets/styles.css`: paleta, tipografía, tamaños y diseño responsive.
- `dist/assets/main.js`: menú, animaciones y selector del seguro.
- `dist/assets/logo.svg` y `logo-light.svg`: monograma KR azul y blanco.
- `dist/assets/img/`: siete fotografías optimizadas. Son escenas ilustrativas generadas con IA; sus prompts están en PROMPTS.txt.
- `FUENTES.md`: referencias oficiales y precisiones de los planes.

WhatsApp: **573128589533**. Para cambiarlo, reemplázalo en index.html y main.js; actualiza también los teléfonos visibles, enlaces tel y Organization. El mensaje del hero y botón flotante es exactamente “Estoy interesado en un Seguro”.

La tipografía Jost se carga desde Google Fonts y se usa en toda la página: títulos de peso 400–500, textos de 400 y botones de 600. Helvetica Neue y Arial son las alternativas. No se incluyen formularios, backend ni analítica.

## Verificación realizada

Versión revisada en navegador a 1440, 768 y 390 px. Menú móvil, desplegables, imágenes y enlaces internos comprobados; el selector de interés genera el mensaje de WhatsApp correspondiente. Logo actualizado revisado en escritorio y móvil. La configuración y las credenciales del proveedor de destino deben verificarse en Antigravity al desplegar.

## Portada en video

La portada usa un video local silencioso de 14,4 segundos con fundidos cruzados de 600 ms entre las seis escenas y en el cierre del bucle. Incluye una imagen de respaldo y controles accesibles de pausa y selección. La barra de progreso se actualiza con cada refresco de pantalla; al seleccionar otra escena se conserva el fotograma visible hasta que el nuevo esté listo y se aplica un fundido. El texto y el botón de WhatsApp son HTML, por lo que permanecen nítidos y utilizables.

- Video de publicación: `dist/assets/video/seguros-kr-portada.mp4`.
- Composición y adaptación a móvil: reglas `.hero-film` en `dist/assets/styles.css`.
- Reproducción y selección de escenas: bloque final de `dist/assets/main.js`.
- Si sustituyes el video, ajusta los tiempos de las escenas en el JavaScript para que los nombres coincidan con las imágenes.
- La reproducción se detiene cuando la portada sale de pantalla o se oculta la pestaña. Con reducción de movimiento o ahorro de datos, solo se carga el video al solicitar reproducción.
- El Dockerfile copia el video con el resto de `dist/`; no necesita paquetes, backend ni compilación.
