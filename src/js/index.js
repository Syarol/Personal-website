/**
 * Global variables
**/

const header = document.getElementsByClassName('site-header')[0];
const modeSwitchers = Array.from(document.getElementsByClassName('mode-switch-input'));

/**
 * Switch of Dark/Light mode 
**/

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-mode', 'dark'); //sets mode
    localStorage.setItem('mode', 'dark'); //saves mode
    setModeSwitchersState(modeSwitchers, true);
  } else {
    document.documentElement.setAttribute('data-mode', 'light');
    localStorage.setItem('mode', 'light');
    setModeSwitchersState(modeSwitchers, false);
  }    
}

function setModeSwitchersState(switchers, state) {
	if (switchers.length > 1) {
		switchers.map(el => el.checked = state);
	} else
		switchers.checked = state;
}

var currentTheme = localStorage.getItem('mode') ? localStorage.getItem('mode') : null; //gets saved mode from localStorage

if (currentTheme) {
  document.documentElement.setAttribute('data-mode', currentTheme);

  if (currentTheme === 'dark') {
  	setModeSwitchersState(modeSwitchers, true);
  }
}

modeSwitchers.map(el => {
	el.onchange = e => switchTheme(e);
});

/**
 * Accepting using cookies
**/

var isCookiesAccepted = localStorage.getItem('cookies-allowed') ? localStorage.getItem('cookies-allowed') : null; //gets saved state from localStorage

var cookiesMessage = document.getElementsByClassName('cookies-message')[0];

/*if using of cookies is allowed then remove the message, else - adds a listener for cookies accepting*/
if (isCookiesAccepted) {
	cookiesMessage.remove();
} else {
	let acceptCookiesBtn = document.getElementsByClassName('cookies-accept-btn')[0];
	acceptCookiesBtn.onclick = () => {
		cookiesMessage.remove();
		localStorage.setItem('cookies-allowed', true);
	}
}

/**
 * Hiding/Showing of header panel, inpage navigation
**/

const inpageLink = Array.from(document.getElementsByClassName('inpage-scroll-link'));
var lastYPos = window.scrollY; //gets initial window offset

function headerStateHandler(e) {
	e.preventDefault();

	let yPos = Math.round(window.scrollY);

	if( yPos <= 0 ) {//scrolled to the very top; element sticks to the top
		headerState(header);
  }
  else if( yPos - lastYPos <= 0 ) {//scrolled up; element slides in
  	headerState(header, true, false);
  }
  else if( yPos - lastYPos > 0 ) {//scrolled down
  	headerState(header, false, false);
  }

	lastYPos = Math.round(window.scrollY);	
}

function headerState(header, show = true, top = true) {
	if (show) {
		header.classList.remove('site-header-hide');
		header.classList.add('site-header-show');
	} else {
		header.classList.remove('site-header-show');
		header.classList.add('site-header-hide');
	}

	if (top) {
		header.classList.remove('site-header-notTop');
		header.classList.add('site-header-top');
	} else {
		header.classList.remove('site-header-top');
		header.classList.add('site-header-notTop');
	}
}

function scrollTo(offset) {
  function onScroll() {
    let scrollTop = Math.round(window.pageYOffset || document.documentElement.scrollTop);

    if (scrollTop === offset) {
      headerState(header, true, false);
      lastYPos = offset;	
			window.addEventListener('scroll', e => headerStateHandler(e));
    }
  }
	
	window.onscroll = () => onScroll();

  window.scroll({
	  behavior: 'smooth',
	  top: offset
	});
}

function scrolToTop() {
	window.scroll({
    behavior: 'smooth',
    top: 0
  });
}

window.onscroll = e => headerStateHandler(e);

inpageLink.map(el => el.onclick = e => {
	let element = document.querySelector(el.getAttribute('scrollTo'));
	let offset = element.offsetTop - header.clientHeight;

	scrollTo(offset);
});


window.onload = e => {
	/*removes preloader when page is loaded*/
	document.getElementsByClassName('preloader-wrapper')[0].remove();

	/*if page open not from top then "stick" header to top of page*/
	if (window.pageYOffset > 0) headerState(header, true, false);
};

document.getElementsByClassName('move-top-btn')[0].onclick = e => scrolToTop();

/**
 * Hiding/Showing of sidebar
**/

const sidebar = document.getElementsByClassName('sidebar')[0];

document.getElementsByClassName('sidebar-open-btn')[0].onclick = () => {
	sidebar.classList.add('sidebar-showed');
	sidebar.classList.remove('sidebar-hidden');
	
	document.body.classList.add('scroll-disabled');
};

document.getElementsByClassName('sidebar-close-btn')[0].onclick = () => {
	sidebar.classList.add('sidebar-hidden');
	sidebar.classList.remove('sidebar-showed');

	document.body.classList.remove('scroll-disabled');
};

if (document.getElementsByClassName('home-main')[0]) {
	/*Saves email address to clipboard*/
	document.getElementsByClassName('copy-email-btn')[0].onclick = () => navigator.clipboard.writeText('oleh.yaroshchuk@yahoo.com');
}
