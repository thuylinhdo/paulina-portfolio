document.addEventListener('DOMContentLoaded', function(){
	const toggleButton = document.querySelector('.nav-toggle');
	const menu = document.getElementById('nav-menu');
	const yearEl = document.getElementById('year');

	if (yearEl){
		yearEl.textContent = new Date().getFullYear();
	}

	if (toggleButton && menu){
		toggleButton.addEventListener('click', function(){
			const isOpen = menu.classList.toggle('open');
			toggleButton.setAttribute('aria-expanded', String(isOpen));
		});

		menu.addEventListener('click', function(e){
			if (e.target.matches('a')){
				menu.classList.remove('open');
				toggleButton.setAttribute('aria-expanded', 'false');
			}
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
		anchor.addEventListener('click', function(e){
			const targetId = this.getAttribute('href').slice(1);
			const section = document.getElementById(targetId);
			if (!section) return;
			e.preventDefault();
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', '#' + targetId);
		});
	});
});


