// цепочка вызовов 
fetch('api/user')
  .then(res => res.json())
  .then(json => fetch(`api/users/${json.id}/comments`))
  .then(res => res.json())
  .then(comments => {
    console.log(comments);
  });

  //несколько запросов однавременно Promise.all
  Promise.all([
    fetch('api/user').then(res => res.json()),
    fetch('api/post/12').then(res => res.json()),
  ]).then(([user, post]) => {
    console.log(user, post)
  });

  // загразка файла
  new Promise(resolve => {
    const script = document.createElement('script');
    script.src = './script.js';
    document.head.append(script);
    script.addEventListener('load', () => {
      resolve();
    })
  })