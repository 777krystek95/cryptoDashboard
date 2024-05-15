const faqBox = document.querySelectorAll(".faq-box");
const faqAnswer = document.querySelectorAll(".faq-box");
const burgerBtn = document.querySelector(".burger-btn");
const aside = document.querySelector(".aside");

faqBox.forEach((item) => item.addEventListener("click", accordion));

function accordion() {
	if (
		this.nextElementSibling.classList.contains("hide") &&
		!this.classList.contains("text-amber-300")
	) {
		this.nextElementSibling.classList.remove("hide");
		this.classList.add("text-amber-300");
	} else {
		this.nextElementSibling.classList.add("hide");
		this.classList.remove("text-amber-300");
	}
}

const move = () => {
	aside.classList.toggle("aside-on");
	burgerBtn.classList.toggle("burger-rotate");
};

burgerBtn.addEventListener("click", move);
