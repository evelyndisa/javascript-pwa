# JavaScript Progressive Web Application

## ¿Qué es una PWA?

- **Aplicación descargable:** Se descarga desde el navegador.
- **Modo offline:** Se puede usar sin conexión, guardando todo en memoria caché para que el dispositivo siga funcionando incluso si el usuario pierde conexión.
- **Frameworks compatibles:** Se puede aplicar en frameworks como Angular, React y Vue, para luego transformarla.
- **Seguridad:** Requiere obligatoriamente HTTPS.
- **Acceso al hardware:** Permite acceder a funcionalidades como la cámara, fotos, etc.
- **Actualizaciones automáticas:** La aplicación se actualiza automáticamente tan pronto como haya conexión a internet, sin necesidad de notificar al usuario.
- **Notificaciones push:** Desde un servidor, es posible enviar notificaciones a los usuarios directamente desde la página web.
- **Rapidez y ligereza:** Las PWAs son rápidas y livianas para descargar.

## Lo que NO es una PWA

- No es una extensión de navegadores web.
- No es un framework.
- No es un plugin o librería para frameworks.

---

## Aplicación Nativa

- Se descargan e instalan desde las tiendas de aplicaciones oficiales, como App Store o Google Play.

---

## Service Worker

Un **Service Worker** es un archivo de JavaScript que corre en segundo plano, en un hilo independiente, y actúa como intermediario entre la aplicación y la red.

### Características principales

- **Registro:** Se registra en el navegador con el siguiente código:
  ```javascript
  navigator.serviceWorker.register('/sw.js')
  ```
- **Ejecución en segundo plano:**
  - No requiere que la página esté abierta en el navegador.
  - Se activa cuando ocurre un evento, como una notificación push o una sincronización en segundo plano.
- **Independiente del DOM:**
  - No tiene acceso directo al DOM.
  - Se comunica con la página mediante la API de `postMessage`.
- **Seguridad:**
  - Solo funciona en entornos HTTPS para garantizar la seguridad.

### Usos principales

- **Modo offline:** Cachea recursos (como archivos HTML, CSS o imágenes) para que la aplicación funcione sin conexión a internet.
- **Notificaciones push:** Permite enviar notificaciones a los usuarios incluso cuando la aplicación no está activa.
- **Actualizaciones de contenido:** Sincroniza datos en segundo plano.
- **Mejora del rendimiento:** Almacena contenido en la caché, reduciendo los tiempos de carga.

### Ejemplo de uso

Archivo `sw.js`:
```javascript
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', event => {
  console.log('Interceptando solicitud a:', event.request.url);
});
```

Registro del Service Worker:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch(error => {
      console.log('Fallo al registrar el Service Worker:', error);
    });
}
```

### Paginas utiles:
- PWA ó AWP de prueba: https://airhorner.com/

- Documentación Manifiesto (Manifest) - Google y MDN
https://web.dev/add-manifest/
https://developer.mozilla.org/es/docs/Web/Manifest

- Generador Online del Manifiesto (manifest.json)
https://manifest-gen.netlify.app/

- Depuración de la PWA (alternativa a lighthouse)
https://developer.chrome.com/docs/devtools/progressive-web-apps?utm_source=lighthouse&utm_medium=devtools&hl=es-419

- screenshots
https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots   


--------------------------------------------

## MANIFEST
Es un archivo de configuración en formato JSON que contiene metadatos sobre la aplicación web. Este archivo proporciona información necesaria para que la aplicación pueda comportarse como una aplicación nativa en dispositivos móviles o de escritorio.

### Propósito del manifest.json
Identidad de la aplicación:

- Define el nombre, descripción e iconos de la aplicación, lo que permite que los usuarios la identifiquen fácilmente.
Apariencia:

- Especifica colores, estilos y pantallas de inicio, mejorando la experiencia visual al integrarse con el sistema operativo.
Instalación:

- Permite a los usuarios "instalar" la aplicación en sus dispositivos, añadiendo un icono en la pantalla de inicio (como en las apps nativas).
Experiencia offline:

- En combinación con un Service Worker, permite cargar recursos esenciales incluso cuando no hay conexión a Internet.
display: Modo de presentación de la aplicación:

"fullscreen": Ocupa toda la pantalla.
"standalone": Parece una app nativa, sin barra de navegación del navegador.
"minimal-ui": Incluye una barra mínima de controles.
"browser": Se muestra como una página normal en el navegador.