(async () => {
	let footerTemplate = await fetch('/html/templates/footer.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	footerTemplate = templateToHTML(footerTemplate);

	class Footer extends HTMLElement {
		constructor(){
			super();

			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(footerTemplate.cloneNode(true));

			shadowRoot.firstElementChild.getElementsByClassName('move-top-btn')[0].onclick = e => scrolToTop();
		}
	}

	customElements.define('custom-footer', Footer);

	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	function scrolToTop() {
		window.scroll({
			behavior: 'smooth',
			top: 0
		});
	}	
})();


