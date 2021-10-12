// универсальная функция для загрузки любого ресурса
// Javascript модуль
// css файл
// данные с сервера
const cssPromises = {} //если загрузка css
function loadResource(src) {
  // Javascript модуль
  if (src.endsWith('.js')) {
    return import(src);
  }
  // css файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => {
          resolve();
        })
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // данные с сервера
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
let searchParams = new URLSearchParams(window.location.search);

// как можно получить параметр для детальной страницы?
// "url": "https://swapi.dev/api/films/1/"
const pageIdParam = searchParams.get('');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data))
    });
}

if (pageIdParam) {
  //загрузка детальной страницы товара
  renderPage(
    './render-details.js',
    `https://swapi.dev/api/films/${pageIdParam}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'
  )

} else {
  renderPage(
    './render.js',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css'
  )
}