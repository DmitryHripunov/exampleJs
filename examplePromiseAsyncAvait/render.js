export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'py-4'
  );

  for (const item of data.results) {
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardDesc = document.createElement('p');
    const detailsBtn = document.createElement('a');

    card.style.width = '18%';
    card.classList.add('card', 'my-2');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardDesc.classList.add('card-text');
    detailsBtn.classList.add('btn');

    card.append(detailsBtn);
    detailsBtn.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardDesc);

    cardTitle.textContent = `эпизод ${item.episode_id}`;
    cardDesc.textContent = item.title;

    // при создании ссылки нужно дополнительно 
    // назначить new URLSearchParams?
    // чтобы не было перехода на странцу "https://swapi.dev/api/films/1/"
    detailsBtn.href = item.url;

    container.append(card);
  }

  return container;
}