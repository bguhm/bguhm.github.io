const searchBtn = document.getElementById("searchBtnHeader");
const searchInput = document.getElementById("searchInputHeader");
const feedback = document.getElementById("searchFeedback");
const container = document.getElementById("container");

// Simple gibberish check
function isGibberish(str) {
  // No vowels OR only consonants (4+ letters)
  return !/[aeiou]/i.test(str) || (str.length > 3 && /^[^aeiou]+$/i.test(str));
}

// Hide feedback initially
feedback.style.display = "none";

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  let found = false;

  // Reset feedback each search
  feedback.innerHTML = "";
  feedback.style.display = "none";

  if (query.length === 0) {
    return; // nothing typed
  }

  // Loop through all game cards (divs inside #container)
  const cards = container.querySelectorAll("div");
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(query)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // If no results
  if (!found) {
    feedback.style.display = "block"; // show floating box
    if (isGibberish(query)) {
      feedback.innerHTML = `<img src="realfunny.gif" alt="Funny gif">`;
    } else {
      feedback.innerHTML = `<img src="notfound.gif" alt="Not found gif">`;
    }
  }
});
