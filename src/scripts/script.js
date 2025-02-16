const tagsContainer = document.getElementById("tags-container");
const author = document.getElementById("author");
const quote = document.getElementById("quote");
const randomBtn = document.getElementById("random-btn");
const shareBtn = document.getElementById("share-btn");

const fetchDataQuotes = async () => {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
		);
		const data = await response.json();
		const quotes = data;

		const randomIndex = () => {
			return Math.floor(Math.random() * quotes.length);
		};

		const quoteDisplay = (randomIndex) => {
			const randomQuote = quotes[randomIndex];
			author.textContent = randomQuote.author;
			quote.textContent = `\"${randomQuote.quote}\"`;

			const tags = randomQuote.tags;
			tagsContainer.innerHTML = "";

			tags.forEach((tag) => {
				const tagElement = document.createElement("span");
				tagElement.classList.add("tag");
				tagElement.textContent = tag;
				tagsContainer.appendChild(tagElement);
			});
		};

		quoteDisplay(randomIndex());

		randomBtn.onclick = () => {
			quoteDisplay(randomIndex());
		};

		shareBtn.onclick = () => {
			navigator.clipboard.writeText(
				`"${quote.textContent}" - ${author.textContent}`
			);
			alert("Quote copied to clipboard!");
		};
	} catch (err) {
		console.error("Error fetching data: ", err);
	}
};

fetchDataQuotes();
