export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container', 'py-4');
  container.innerHTML = `<h1>детальная информация ${data}</h1>`;
  return container;
}