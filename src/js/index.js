/**
 * Global variables
**/

const header = document.getElementsByTagName('custom-header')[0];

/**
 * Applying saved theme
**/

const mode = localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light'; //gets saved mode from localStorage
document.documentElement.setAttribute('data-mode', mode);

/**
 * Inpage navigation
**/

const inpageLink = Array.from(document.getElementsByClassName('inpage-scroll-link'));

function scrollTo(offset) {
	window.scroll({
		behavior: 'smooth',
		top: offset
	});
}

inpageLink.map(el => el.onclick = e => {
	let element = document.querySelector(el.getAttribute('scrollTo'));
	let offset = element.offsetTop - header.clientHeight;

	scrollTo(offset);
});

window.addEventListener('load', () => {
	/*removes preloader when page is loaded*/
	document.getElementsByTagName('page-preloader')[0].remove();
});

/**
 * Hiding/Showing of sidebar
**/

const sidebar = document.getElementsByClassName('sidebar')[0];

/* document.getElementsByClassName('sidebar-open-btn')[0].onclick = () => {
	sidebar.classList.add('sidebar-showed');
	sidebar.classList.remove('sidebar-hidden');
	
	document.body.classList.add('scroll-disabled');
}; */

document.getElementsByClassName('sidebar-close-btn')[0].onclick = () => {
	sidebar.classList.add('sidebar-hidden');
	sidebar.classList.remove('sidebar-showed');

	document.body.classList.remove('scroll-disabled');
};

if (document.getElementsByClassName('home-main')[0] || document.getElementsByClassName('contact-main')[0]) {
	/*Saves email address to clipboard*/
	document.getElementsByClassName('copy-email-btn')[0].onclick = () => navigator.clipboard.writeText('oleh.yaroshchuk@yahoo.com');
}
