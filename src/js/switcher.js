(async () => {
	let switcherTemplate = await fetch('/html/templates/switcher.html', {
		method: 'GET',
	})
		.then(res => res.text())
		.catch(err => console.log(err));

	switcherTemplate = templateToHTML(switcherTemplate);

	class Switcher extends HTMLElement {
		constructor(){
			super();
			this.theme = localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'; //gets saved mode from localStorage

			const shadowRoot = this.attachShadow({mode: 'open'});
			shadowRoot.appendChild(switcherTemplate.cloneNode(true));

			let switcher = shadowRoot.getElementById('checkbox');
			switcher.checked = this.theme === 'dark' ? true : false;

			switcher.onchange = e => switchTheme(e);

			window.addEventListener('switcher', (e) => { 
				this.theme = localStorage.getItem('mode');
				switcher.checked = this.theme === 'dark' ? true : false;
			});
		}
	}

	customElements.define('mode-switch', Switcher);

	function templateToHTML(template){
		return new DOMParser().parseFromString(template, 'text/html').head.firstElementChild.content;
	};

	function switchTheme(e) {
		if (e.target.checked) {
			document.documentElement.setAttribute('data-mode', 'dark'); //sets mode
			localStorage.setItem('mode', 'dark'); //saves mode
		} else {
			document.documentElement.setAttribute('data-mode', 'light');
			localStorage.setItem('mode', 'light');
		}
		
		window.dispatchEvent(switchEvent);
	}
})();


