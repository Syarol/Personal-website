(async () => {
	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	let template = await fetch('/components/inline-link/inline-link.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	class InlineLink extends HTMLElement {
		constructor() {
			super();
			if (!this.innerHTML) return console.error('"Inline-link" doesn\'t received all needed data!');

			let elTemplate = template.replace('{link}', this.attributes.to.value);
			elTemplate = elTemplate.replace('{text}', this.innerHTML);
			elTemplate = templateToHTML(elTemplate);
				
			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(elTemplate.cloneNode(true));

			this.onclick = () => shadowRoot.activeElement.blur();
		}
	}

	customElements.define('inline-link', InlineLink);
})();