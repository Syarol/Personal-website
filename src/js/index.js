/**
 * Global variables
**/

const header = document.getElementsByTagName('custom-header')[0];
const switchEvent = new CustomEvent('switcher');
const sidebarOpenEvent = new CustomEvent('sidebar-open');
const sidebarCloseEvent = new CustomEvent('sidebar-close');

/**
 * Applying saved in localStorage theme
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

window.addEventListener('DOMContentLoaded', () => {
	/*removes preloader when page is loaded*/
	document.getElementsByTagName('page-preloader')[0].remove();
});

/**
 * Hiding/Showing of sidebar
**/

const sidebar = document.getElementsByTagName('custom-sidebar')[0];

window.addEventListener('sidebar-open', () => {
	sidebar.open();
	document.body.classList.add('scroll-disabled');
});

window.addEventListener('sidebar-close', () => {
	sidebar.close();
	document.body.classList.remove('scroll-disabled');
});

if (document.getElementsByClassName('home-main')[0] || document.getElementsByClassName('contact-main')[0]) {
	/*Saves email address to clipboard*/
	document.getElementsByClassName('copy-email-btn')[0].onclick = () => navigator.clipboard.writeText('oleh.yaroshchuk@yahoo.com');
}
