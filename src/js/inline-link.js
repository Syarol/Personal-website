(async () => {
	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	let template = await fetch('/html/templates/inline-link.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	class Preloader extends HTMLElement {
		constructor() {
			super();
			if (!this.textContent) return console.error('"Inline-link" doesn\'t received all needed data!');

			let elTemplate = template.replace('{link}', this.attributes.to.value);
			elTemplate = elTemplate.replace('{text}', this.textContent);
			elTemplate = templateToHTML(elTemplate);
				
			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(elTemplate.cloneNode(true));

			this.onclick = () => shadowRoot.activeElement.blur();
		}
	}

	customElements.define('inline-link', Preloader);
})();