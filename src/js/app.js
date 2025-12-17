document.addEventListener('aos:in', ({ detail }) => {
	detail.removeAttribute('style');
});
function App() {
	// scroll fixed header
	const headerFixed = document.querySelector('.header');
	const setFixedHeader = () => {
		headerFixed.classList.toggle('scroll-active', window.scrollY >= 60);
	};
	window.addEventListener('scroll', setFixedHeader);

	// scroll back top
	document.querySelector('.footer__back').addEventListener('click', () => {
		window.scrollTo({
			top: 0,
		});
	});

	/// header burger
	const burger = document.querySelector('.burger');
	const header = document.querySelector('.header');
	const navItems = document.querySelectorAll('.nav__item');
	const body = document.body;

	function closeMenu() {
		burger.classList.remove('active');
		header.classList.remove('open-menu');
		body.style.overflow = 'visible';
	}
	function toggleMenu() {
		const isActive = burger.classList.toggle('active');
		header.classList.toggle('open-menu', isActive);
		body.style.overflow = isActive ? 'hidden' : 'visible';
	}
	burger.addEventListener('click', toggleMenu);

	navItems.forEach(item => {
		item.addEventListener('click', () => {
			closeMenu();
			navItems.forEach(el => {
				el.classList.remove('active__item')
			})
			item.classList.add('active__item');
		});
	});
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});

	/// tabs portfolio

	const buttons = document.querySelectorAll('.portfolio__tabs-btn');
	const tabs = document.querySelectorAll('.portfolio__tab');

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			buttons.forEach(btn => btn.classList.remove('active'));
			tabs.forEach(tab => tab.classList.remove('active'));
			button.classList.add('active');
			document.getElementById(button.dataset.tab).classList.add('active');
		});
	});
}

document.addEventListener('DOMContentLoaded', function () {
	AOS.init({
		duration: 1000,
		delay: 100,
	});
	App();
});
