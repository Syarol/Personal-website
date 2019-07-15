/*removes preloader when page is loaded*/
window.onload = e => {
	document.getElementsByClassName('preloader-wrapper')[0].remove();
};