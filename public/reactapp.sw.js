function installServiceWorker() {
	console.log('installServiceWorker - ServiceWorker instalado com sucesso!');
}

self.addEventListener("install", installServiceWorker);

var	identification = 'reactapp.sw';
var	version = 1;
var	currentId = identification	+ '-' + version;
var	lastId = identification + '-' + (version - 1);

var	urls = [
	'/',
	'static/js/bundle.js',
	'static/js/1.chunk.js',
	'static/js/main.chunk.js'
];

// function activateServiceWorker() {
// 	console.log('activateServiceWorker');
// 	console.log('currentId = ', currentId);
// 	console.log('lastId = ', lastId);
// 	caches.open(currentId)
// 			.then(cache	=>	{
// 					console.log('Cache Storage ' + currentId + ' foi ativado com sucesso!');
// 					cache.addAll(urls)
// 							.then(function(){
// 									caches.delete(lastId)
// 									console.log('Cache Storage ' + lastId + ' foi excluído!');
// 					})
// 	})
// }

self.addEventListener("activate", activateServiceWorker);

function fetchApplication(event){
	console.log("fetchApplication");
	event.respondWith(
			caches.match(event.request).then(function(fileCache){
					return fileCache ? fileCache : fetch(event.request);
			})
	)
}

self.addEventListener("fetch",	fetchApplication);
