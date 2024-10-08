// const CACHE_NAME = 'monaco-editor-cache-v1';
// const urlsToCache = [
//   '/monaco/min/vs/loader.js',
//   '/monaco/min/vs/editor/editor.main.js',
//   '/monaco/min/vs/language/typescript/tsWorker.js',
//   // 添加其他需要缓存的文件
// ];

// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       })
//   );
// });