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
				el.classList.remove('active__item');
			});
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

///animation snow
const month = new Date().getMonth();
if (month === 11 || month === 0 || month === 1) {
	const canvas = document.querySelector('.snow');
	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let flakes = [];
	let angle = 0;

	for (let i = 0; i < 100; i++) {
		flakes.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			size: Math.random() * 20 + 10,
			speed: Math.random() * 1 + 0.2,
			char: ['❄', '❅', '❆'][Math.floor(Math.random() * 3)],
			color: `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`,
		});
	}

	function drawSnow() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		flakes.forEach(f => {
			ctx.font = `${f.size}px Arial`;
			ctx.fillStyle = f.color;
			ctx.fillText(f.char, f.x, f.y);
		});

		moveSnow();
	}

	function moveSnow() {
		angle += 0.01;

		flakes.forEach(f => {
			f.y += f.speed;
			f.x += Math.sin(angle) * 0.2;

			if (f.y > canvas.height) {
				f.y = -20;
				f.x = Math.random() * canvas.width;
			}
		});
	}

	function animateSnow() {
		drawSnow();
		requestAnimationFrame(animateSnow);
	}

	animateSnow();

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
} else {
	const canvas = document.querySelector('.snow');
	if (canvas) canvas.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
	AOS.init({
		duration: 1000,
		delay: 100,
	});
	App();
});
