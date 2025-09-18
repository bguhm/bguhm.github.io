document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtnHeader");
  const searchInput = document.getElementById("searchInputHeader");
  const feedback = document.getElementById("searchFeedback");
  const container = document.getElementById("container");

  // Simple gibberish check
  function isGibberish(str) {
    return !/[aeiou]/i.test(str) || (str.length > 3 && /^[^aeiou]+$/i.test(str));
  }

  // Hide feedback initially
  if (feedback) feedback.style.display = "none";

  function runSearch() {
    const query = searchInput.value.trim().toLowerCase();
    let found = false;

    // Reset feedback each search
    feedback.innerHTML = "";
    feedback.style.display = "none";

    if (query.length === 0) {
      // show everything again if cleared
      container.querySelectorAll("div").forEach(card => {
        card.style.display = "block";
      });
      return;
    }

    // Loop through all game cards
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
      feedback.style.display = "block";
      feedback.innerHTML = isGibberish(query)
        ? `<img src="realfunny.gif" alt="Funny gif">`
        : `<img src="notfound.gif" alt="Not found gif">`;
    }
  }

  // Run search when typing
  if (searchInput) {
    searchInput.addEventListener("input", runSearch);
  }

  // Run search on button click
  if (searchBtn) {
    searchBtn.addEventListener("click", runSearch);
  }
});
