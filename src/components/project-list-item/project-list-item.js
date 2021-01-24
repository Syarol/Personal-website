(async () => {
	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	let template = await fetch('/components/project-list-item/project-list-item.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	class ProjectListItem extends HTMLElement {
		constructor() {
			super();
			//if (!this) return console.error('"Project-list-item" doesn\'t received all needed data!');

			let tags = this.attributes.tags.value.split(',').map(el => '<li>'+el+'</li>').join('');
			let elTemplate = template.replace('{link}', this.attributes.link.value);
			elTemplate = elTemplate.replace('{title}', this.attributes.title.value);
			elTemplate = elTemplate.replace('{thumbnailURL}', this.attributes.thumbnail.value);
			elTemplate = elTemplate.replace('{description}', this.attributes.description.value);
			elTemplate = elTemplate.replace('{tags}', tags);
			elTemplate = templateToHTML(elTemplate);
				
			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(elTemplate.cloneNode(true));
		}
	}

	customElements.define('project-list-item', ProjectListItem);
})();