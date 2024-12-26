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
https://web.dev/articles/add-manifest?hl=es
https://developer.mozilla.org/es/docs/Web/Manifest