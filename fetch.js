window.addEventListener('load', function(event) {
	startPreloadAnimation();
	let userId = 3;
	//let link = "https://jsonplaceholder.typicode.com/users/" + userId +"/posts";
	let linkAPI = "https://jsonplaceholder.typicode.com/posts";
	getPosts(linkAPI);
});
// начать анимацию загрузки
function startPreloadAnimation() {
	let htmlPreloader = "<div id=\"cube-loader\"><div class=\"caption\"><div class=\"cube-loader\"><div class=\"cube loader-1\"></div><div class=\"cube loader-2\"></div><div class=\"cube loader-4\"></div><div class=\"cube loader-3\"></div></div></div></div>";
	let container = document.querySelector('.container-lg');
	container.insertAdjacentHTML('afterbegin', htmlPreloader);
}
// завершить анимацию загрузки
function stopPreloadAnimation() {
	let container = document.querySelector('.container-lg');
	let preloader = document.getElementById('cube-loader');
	container.removeChild(preloader);
}
//запросить данные в формате json
function getPosts(urlLink) {
	fetch(urlLink, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => response.json()).then( handleData );
}



// обработать массив данных

function cropString(string, len) {
	if (string.length >= len) {
		return string.substring(0, len) + " ...";
	}
	return string;
}

module.exports = cropString;

function handleData(postsJson) {
	let container = document.querySelector('.row');
	//for (let item of result) {
		//renderPost(item, container);
	//}
	postsJson.map(function (postData) {
		postData["photo"] = "https://via.placeholder.com/400x300.jpg";
		postData["title"] = cropString(postData["title"], 30);
		postData["body"] = cropString(postData["body"], 120);
		renderPost(postData, container);
	});
	// для демонтрационных целей: анимация изчезает только спустя 3 секунды после прогрузки контента, иначе слишком быстро
	//let timeOutId = setTimeout(stopPreloadAnimation, 3000);
	stopPreloadAnimation();
}
// создать дом структуру и вставить данные json, затем отрисовать на странице
function renderPost(data, container) {
	// колонка
	let col = document.createElement('div');
	col.classList.add('col-6', 'col-md-3');
	// карточка
	let card = document.createElement('div');
	card.classList.add('card', 'w-100', 'h-100', 'bg-light', 'border', 'border-3', 'border-success', 'rounded-3');
	card.setAttribute('data-id-post', data["id"]);
	col.append(card);
	// картинка
	let img = document.createElement('img');
	img.classList.add('card-img-top', 'img-fluid', 'w-100');
	img.src = data["photo"];
	img.alt = "photo";
	card.append(img);
	// тело карточки
	let body = document.createElement('div');
	body.classList.add('card-body');
	card.append(body);
	// заголовок
	let title = document.createElement('h5');
	title.classList.add('card-title', 'text-success');
	title.innerHTML = data["title"];
	body.append(title);
	// автор
	let author = document.createElement('h6');
	author.classList.add('card-subtitle', 'mb-2', 'text-muted');
	author.innerHTML = "Аноним " + data["userId"];
	body.append(author);
	// текст
	let text = document.createElement('p');
	text.classList.add('card-text');
	text.innerHTML = data["body"];
	body.append(text);

	container.append(col);
}