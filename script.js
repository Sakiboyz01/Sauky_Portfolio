document.addEventListener("DOMContentLoaded", () => {

	const hamDefault = document.getElementById("ham-default");
	const defaultMenu = document.getElementById("defaultNavMenu");

	hamDefault.addEventListener("click", () => {
		const isOpen = defaultMenu.classList.contains("show");
		defaultMenu.classList.toggle("show", !isOpen);
		hamDefault.setAttribute("aria-expanded", String(!isOpen));
	});

	document.addEventListener("click", (e) => {
		if (
			defaultMenu.classList.contains("show") &&
			!defaultMenu.contains(e.target) &&
			!hamDefault.contains(e.target)
		) {
			defaultMenu.classList.remove("show");
			hamDefault.setAttribute("aria-expanded", "false");
		}
	});

	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-link");

	window.addEventListener("scroll", () => {
		let current = "";

		sections.forEach((section) => {
			const sectionTop = section.offsetTop - 120;
			if (window.scrollY >= sectionTop) {
				current = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href").includes(current)) {
				link.classList.add("active");
			}
		});
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();

			const targetId = link.getAttribute("href").substring(1);
			const target = document.getElementById(targetId);

			if (!target) return;

			window.scrollTo({
				top: target.offsetTop - 70,
				behavior: "smooth"
			});

			defaultMenu.classList.remove("show");
		});
	});

	const words = [
		"Informatics Student",
		"Front-End Developer",
		"UI/UX Learner"
	];

	const text = document.getElementById("typing-text");

	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;

	function typeEffect() {
		const currentWord = words[wordIndex];

		if (isDeleting) {
			charIndex--;
		} else {
			charIndex++;
		}

		text.textContent = currentWord.substring(0, charIndex);

		let speed = isDeleting ? 60 : 100;

		if (!isDeleting && charIndex === currentWord.length) {
			speed = 1500;
			isDeleting = true;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			speed = 300;
		}

		setTimeout(typeEffect, speed);
	}

	typeEffect();

	window.showCertificate = function (src) {
		document.getElementById("certificatePreview").src = src;

		const modal = new bootstrap.Modal(
			document.getElementById("certificateModal")
		);

		modal.show();
	};

});