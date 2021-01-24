(async () => {
	let sidebarTemplate = await fetch('/components/sidebar/sidebar.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

		sidebarTemplate = templateToHTML(sidebarTemplate);

	class Sidebar extends HTMLElement {
		constructor() {
			super();

			this._shadowRoot = this.attachShadow({mode: 'open'});
			this._shadowRoot.appendChild(sidebarTemplate.cloneNode(true));
			this.sidebar = this._shadowRoot.lastElementChild;
			this.switcher = this.sidebar.getElementsByTagName('mode-switch');

			//'sidebarCloseEvent' have to be declared in script that serve page
			this._shadowRoot.lastElementChild.getElementsByClassName('sidebar-close-btn')[0].onclick = () => window.dispatchEvent(sidebarCloseEvent);
		}

		open(){
			this.sidebar.classList.add('sidebar-showed');
			this.sidebar.classList.remove('sidebar-hidden');
		
			this.switcher.theme = localStorage.getItem('mode');
		}

		close(){
			this.sidebar.classList.add('sidebar-hidden');
			this.sidebar.classList.remove('sidebar-showed');
		}
	}

	customElements.define('custom-sidebar', Sidebar);

	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};
})();