(async () => {
	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	let template = await fetch('/components/preloader/preloader.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	class Preloader extends HTMLElement {
		constructor() {
			super();
			template = templateToHTML(template);
				
			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(template.cloneNode(true));
		}
	}

	customElements.define('page-preloader', Preloader);
})();