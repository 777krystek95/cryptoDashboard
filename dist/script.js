const downSection = document.querySelector(".down");
const portfolioBox = document.querySelector(".portfolio-box");
const cryptoChangeAll = document.querySelectorAll(".crypto-change");
const refreshBtn = document.querySelector(".refresh-btn");
const burgerBtn = document.querySelector(".burger-btn");
const aside = document.querySelector(".aside");

const URL = "https://api.coincap.io/v2/assets";

fetch(URL)
	.then((res) => res.json())
	.then((data) => {
		data.data.forEach((crypto) => {
			const cryptoName = crypto.id;
			const cryptoPrice = parseFloat(crypto.priceUsd).toFixed(2);
			const cryptoChange = parseFloat(crypto.changePercent24Hr).toFixed(2);
			const cryptoSymbol = crypto.symbol;

			const cryptoParentBox = document.createElement("div");
			cryptoParentBox.classList.add(
				"crypto-list-box",
				"flex",
				"justify-evenly",
				"items-center",
				"text-3xl",
				"w-[95%]",
				"py-4",
				"group"
			
			);
			downSection.appendChild(cryptoParentBox);

			// Tworzenie divów i dodawanie do cryptoParentBox
			const div1 = document.createElement("div");
			div1.classList.add(
				"single-crypto",
				"single-crypto-margin",
				"py-4",
				"w-full",
				"rounded-xl",
				"bg-zinc-600",
				"text-center",
				"flex",
				"justify-start",
				"items-center",
				"group-hover:bg-amber-300",
				"transition-all",
				"duration-700"


			);
			cryptoParentBox.appendChild(div1);

			/* dodanie add-btn */

			const addBtn = document.createElement("button");
			addBtn.classList.add(
				"add-btn",
				"add-btn-color",
				"font-bold",
				"text-5xl",
				"px-4"
			);
			addBtn.textContent = "+";
			div1.appendChild(addBtn);

			addBtn.addEventListener("click", addToPortfolio);

			const paragraf1 = document.createElement("p");
			paragraf1.classList.add("crypto-name");
			paragraf1.innerHTML = `${cryptoName}`;
			div1.appendChild(paragraf1);

			const div2 = document.createElement("div");
			div2.classList.add(
				"single-crypto",
				"single-crypto-margin",
				"py-4",
				"w-full",
				"rounded-lg",
				"bg-zinc-600",
				"flex",
				"justify-start",
				"items-center",
				"group-hover:bg-amber-300",
				"transition-all",
				"duration-700"
			);
			cryptoParentBox.appendChild(div2);

			const logoBox = document.createElement("div");
			logoBox.classList.add("logo-box");
			div2.appendChild(logoBox);

			const logo1 = document.createElement("img");
			logo1.setAttribute("src",`https://assets.coincap.io/assets/icons/${cryptoSymbol.toLowerCase()}@2x.png`);
			logo1.setAttribute("alt","logo");

			if (cryptoSymbol === "IOTA") {
				logo1.setAttribute("src", `https://www.iota.org/logo-icon-light.svg`);
			}

			logo1.classList.add("crypto-logo");
			logoBox.appendChild(logo1);

			const paragraf2 = document.createElement("p");
			paragraf2.classList.add("crypto-symbol");
			paragraf2.innerHTML = `${cryptoSymbol}`;
			div2.appendChild(paragraf2);

			const div3 = document.createElement("div");
			div3.classList.add(
				"single-crypto",
				"single-crypto-margin",
				"mr-2",
				"py-4",
				"w-full",
				"rounded-xl",
				"bg-zinc-600",
				"text-center",
				"group-hover:bg-amber-300",
				"transition-all",
				"duration-700"
			);
			cryptoParentBox.appendChild(div3);

			const paragraf3 = document.createElement("p");
			paragraf3.classList.add("crypto-price");
			paragraf3.innerHTML = `$${cryptoPrice}`;
			div3.appendChild(paragraf3);

			const div4 = document.createElement("div");
			div4.classList.add(
				"single-crypto",
				"single-crypto-margin",
				"py-4",
				"w-full",
				"rounded-xl",
				"bg-zinc-600",
				"text-center",
				"group-hover:bg-amber-300",
				"transition-all",
				"duration-700"
				
			);
			cryptoParentBox.appendChild(div4);

			const paragraf4 = document.createElement("p");
			paragraf4.classList.add("crypto-change");
			paragraf4.innerHTML = `${cryptoChange}%`;
			div4.appendChild(paragraf4);

			function addToPortfolio(event) {
				const cryptoListBox = event.target.closest(".crypto-list-box");
				if (!cryptoListBox) return;

				const cryptoName =
					cryptoListBox.querySelector(".crypto-name").innerHTML;
				const cryptoSymbol =
					cryptoListBox.querySelector(".crypto-symbol").innerHTML;
				const cryptoPrice =
					cryptoListBox.querySelector(".crypto-price").innerHTML;

				let myPortfolio = JSON.parse(localStorage.getItem("myPortfolio")) || [];

				const existingCrypto = myPortfolio.find(
					(crypto) => crypto.name === cryptoName
				);

				if (existingCrypto) {
					alert("Ta kryptowaluta jest już w Twoim portfelu!");
					return;
				}

				// Dodawanie krypto do local storage
				myPortfolio.push({
					name: cryptoName,
					symbol: cryptoSymbol,
					price: cryptoPrice,
				});
				localStorage.setItem("myPortfolio", JSON.stringify(myPortfolio));

				// crypto-box w My Portfolio
				const cryptoBox = document.createElement("div");
				cryptoBox.classList.add(
					"crypto-box",
					"space-y-2",
					"flex",
					"flex-col",
					"justify-center",
					"items-center",
					"py-4"
				);

				const cryptoNameElement = document.createElement("h3");
				cryptoNameElement.classList.add(
					"crypto-name-portfolio",
					"text-4xl",
					"text-amber-300",
					"capitalize",
					"text-center"
				);
				cryptoNameElement.textContent = cryptoName;
				cryptoBox.appendChild(cryptoNameElement);

				const cryptoLogoElement = document.createElement("p");
				cryptoLogoElement.classList.add(
					"crypto-logo-portfolio",
					"text-xl",
					"text-center"
				);
				cryptoLogoElement.textContent = cryptoSymbol;
				cryptoBox.appendChild(cryptoLogoElement);

				const cryptoPriceElement = document.createElement("p");
				cryptoPriceElement.classList.add("crypto-price-portfolio", "text-2xl");
				cryptoPriceElement.textContent = cryptoPrice;
				cryptoBox.appendChild(cryptoPriceElement);

				const cryptoDeleteBtn = document.createElement("button");
				cryptoDeleteBtn.classList.add(
					"mt-2",
					"text-3xl",
					"text-downgrade",
					"delete-btn"
				);
				cryptoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
				cryptoBox.appendChild(cryptoDeleteBtn);

				cryptoDeleteBtn.addEventListener("click", () => {
					removeCryptoFromStorage(cryptoName);
					cryptoBox.remove();
				});

				portfolioBox.appendChild(cryptoBox);
			}

			if (paragraf4.textContent.includes("-")) {
				paragraf4.classList.add("text-downgrade");
			} else {
				paragraf4.classList.add("text-upgrade");
			}
		});
	});

function removeCryptoFromStorage(name) {
	let myPortfolio = JSON.parse(localStorage.getItem("myPortfolio")) || [];
	myPortfolio = myPortfolio.filter((crypto) => crypto.name !== name);
	localStorage.setItem("myPortfolio", JSON.stringify(myPortfolio));
}

// My portfolio po odswieżeniu strony

document.addEventListener("DOMContentLoaded", () => {
	const myPortfolio = JSON.parse(localStorage.getItem("myPortfolio")) || [];
	const portfolioBox = document.querySelector(".portfolio-box");

	myPortfolio.forEach((crypto) => {
		const cryptoBox = document.createElement("div");
		cryptoBox.classList.add(
			"crypto-box",
			"flex",
			"flex-col",
			"justify-center",
			"py-4",
			"items-center",
			"space-y-2"
		);

		const cryptoNameElement = document.createElement("h3");
		cryptoNameElement.classList.add(
			"crypto-name-portfolio",
			"text-4xl",
			"text-amber-300",
			"capitalize"
		);
		cryptoNameElement.textContent = crypto.name;
		cryptoBox.appendChild(cryptoNameElement);

		const cryptoLogoElement = document.createElement("p");
		cryptoLogoElement.classList.add(
			"crypto-logo-portfolio",
			"text-xl",
			"text-center"
		);
		cryptoLogoElement.textContent = crypto.symbol;
		cryptoBox.appendChild(cryptoLogoElement);

		const cryptoPriceElement = document.createElement("p");
		cryptoPriceElement.classList.add("crypto-price-portfolio", "text-2xl");
		cryptoPriceElement.textContent = crypto.price;
		cryptoBox.appendChild(cryptoPriceElement);

		const cryptoDeleteBtn = document.createElement("button");
		cryptoDeleteBtn.classList.add(
			"mt-2",
			"text-3xl",
			"text-downgrade",
			"delete-btn"
		);
		cryptoDeleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
		cryptoBox.appendChild(cryptoDeleteBtn);

		portfolioBox.appendChild(cryptoBox);

		cryptoDeleteBtn.addEventListener("click", () => {
			const cryptoName = crypto.name;
			removeCryptoFromStorage(cryptoName);
			a;
			cryptoBox.remove();
		});
	});
});

const refresh = () => {
	location.reload();
};

const move = () => {
	aside.classList.toggle("aside-on");
	burgerBtn.classList.toggle("burger-rotate");
};

burgerBtn.addEventListener("click", move);
refreshBtn.addEventListener("click", refresh);
