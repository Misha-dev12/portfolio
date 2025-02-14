function App() {
	
	

	

	// scroll header
	const headerFixed = document.querySelector('.header');

	const setFixedHeader = () => {
		headerFixed.classList.toggle('scroll-active', window.scrollY >= 60);
	};

	window.addEventListener('scroll', setFixedHeader);

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
		item.addEventListener('click', closeMenu);
	});
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});
}

App();
