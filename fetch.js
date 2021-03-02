window.addEventListener('load', function(event) {
	startPreloadAnimation();
	let userId = 3;
	//let link = "https://jsonplaceholder.typicode.com/users/" + userId +"/posts";
	let link = "https://jsonplaceholder.typicode.com/posts";
	loadPosts(link);
});
// начать анимацию загрузки
function startPreloadAnimation() {
	let htmlPreloader = "<div id=\"cube-loader\"><div class=\"caption\"><div class=\"cube-loader\"><div class=\"cube loader-1\"></div><div class=\"cube loader-2\"></div><div class=\"cube loader-4\"></div><div class=\"cube loader-3\"></div></div></div></div>";
let container = document.querySelector('.wrapper');
container.insertAdjacentHTML('afterbegin', htmlPreloader);
}
// завершить анимацию загрузки
function stopPreloadAnimation() {
	let container = document.querySelector('.wrapper');
	let preloader = document.getElementById('cube-loader');
	container.removeChild(preloader);
}
//запросить данные в формате json
function loadPosts(urlLink) {
	fetch(urlLink, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()).then(processData);
}
// обработать массив данных
function processData(result) {
	let container = document.querySelector('.wrapper');
	for (let item of result) {
		renderPost(item, container);
	}
	// для демонтрационных целей: анимация изчезает только спустя 3 секунды после прогрузки контента, иначе слишком быстро
	let timeOutId = setTimeout(stopPreloadAnimation, 3000);
	//stopPreloadAnimation();
}
// создать дом структуру и вставить данные json, затем отрисовать на странице
function renderPost(data, container) {
	// элемент контейнера поста
	let post = document.createElement('div');
	post.classList.add('post');
	post.setAttribute('data-id-post', data["id"]);
	// имя пользователя поста
	let postUsername = document.createElement('div');
	postUsername.classList.add('post__username');
	post.append(postUsername);
	let usernameP = document.createElement('p');
	postUsername.append(usernameP);
	usernameP.innerHTML = "Аноним " + data["userId"] + ":";
	// контейнер заголовка и текста поста
	let postColumn = document.createElement('div');
	postColumn.classList.add('post__column');
	post.append(postColumn);
	// заголовок поста
	let postTitle = document.createElement('div');
	postTitle.classList.add('post__title');
	postColumn.append(postTitle);
	let postTitleP = document.createElement('p');
	postTitleP.innerHTML = data["title"];
	postTitle.append(postTitleP);
	// текст поста
	let postText = document.createElement('div');
	postText.classList.add('post__text');
	postColumn.append(postText);
	let postTextP = document.createElement('p');
	postTextP.innerHTML = data["body"];
	postText.append(postTextP);
	
	
	container.append(post);
}