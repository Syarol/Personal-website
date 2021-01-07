(async () => {
	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	let template = await fetch('/html/templates/project-card.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	class ProjectCard extends HTMLElement {
		constructor() {
			super();
			//if (!this) return console.error('"Project-card" doesn\'t received all needed data!');

			let elTemplate = template.replace('{link}', this.attributes.link.value);
			elTemplate = elTemplate.replace('{title}', this.attributes.title.value);
			elTemplate = elTemplate.replace('{image}', this.attributes.image.value);
			elTemplate = elTemplate.replace('{stack}', this.attributes.stack.value);
			elTemplate = templateToHTML(elTemplate);
				
			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(elTemplate.cloneNode(true));
		}
	}

	customElements.define('project-card', ProjectCard);
})();