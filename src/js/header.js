(async () => {
	let headerTemplate = await fetch('/html/templates/header.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	headerTemplate = templateToHTML(headerTemplate);

	class Header extends HTMLElement {
		constructor() {
			super();

			this._shadowRoot = this.attachShadow({mode: 'open'});
			this._shadowRoot.appendChild(headerTemplate.cloneNode(true));
			this.header = this._shadowRoot.firstElementChild;
			this.lastYPos = window.scrollY;

			/*if page open not from top then "stick" header to top of page*/
			if (window.pageYOffset > 0) this.stateHandler(true, false);

			window.onscroll = e => this.positionController(e);
		}

		positionController(e){
			e.preventDefault();
	
			let yPos = Math.round(window.scrollY);
		
			if( yPos <= 0 ) {//scrolled to the very top; element sticks to the top
				this.stateHandler();
			}
			else if( yPos - this.lastYPos <= 0 ) {//scrolled up; element slides in
				this.stateHandler(true, false);
			}
			else if( yPos - this.lastYPos > 0 ) {//scrolled down
				this.stateHandler(false, false);
			}
		
			this.lastYPos = Math.round(window.scrollY);
		}

		stateHandler(show = true, top = true) {
			if (show) {
				this.header.classList.remove('site-header-hide');
				this.header.classList.add('site-header-show');
			} else {
				this.header.classList.remove('site-header-show');
				this.header.classList.add('site-header-hide');
			}
		
			if (top) {
				this.header.classList.remove('site-header-notTop');
				this.header.classList.add('site-header-top');
			} else {
				this.header.classList.remove('site-header-top');
				this.header.classList.add('site-header-notTop');
			}
		}
	}

	customElements.define('custom-header', Header);

	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};
})();