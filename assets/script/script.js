var $ = function(s){
	return document.querySelector(s);
}
var $$ = function(s){
	return document.querySelectorAll(s);
}

/* sliders */

var collectionSlider = new Swiper('#collections', {
	slidesPerView: 'auto',
	spaceBetween: 50,
	speed: 700,
	centeredSlides: true
})

for(var slide of collectionSlider.slides) {
	slide.addEventListener('click', function() {
		collectionSlider.slideTo(collectionSlider.clickedIndex, 700)
	})
}

/* load body */

var body = document.body;
body.classList.remove('preload')
	
/* scroll smooth */

var scrollWrap = document.getElementsByClassName("wrapper")[0],
	height = scrollWrap.getBoundingClientRect().height - 1,
	speed = 0.1;
// speed = 1;
var offset = 0;
body.style.height = Math.floor(height) + "px";
function smoothScroll() {
	offset += (window.pageYOffset - offset) * speed;
	var scroll = "translateY(-" + offset + "px) translateZ(0)";
	scrollWrap.style.transform = scroll;
	callScroll = requestAnimationFrame(smoothScroll);
}
smoothScroll();
	
/*inview animation */
var observedElements = document.querySelectorAll('.inview-element');
var options = {threshold: 0.45}

var inViewCallback = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting || entry.target.dataset.show) {
			entry.target.classList.add('inview');
		}
	})
}
var observer = new IntersectionObserver(inViewCallback,options);

observedElements.forEach(element => {
	var dataDelay = element.getAttribute('data-delay');
	element.style.transitionDelay = dataDelay+'ms';
	observer.observe(element);
});