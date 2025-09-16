  const searchBtn = document.getElementById("searchBtnHeader");
  const searchInput = document.getElementById("searchInputHeader");
  const feedback = document.getElementById("searchFeedback");

  function isGibberish(str) {
    // Basic gibberish check: no vowels or too many consonants in a row
    return !/[aeiou]/i.test(str) || str.length > 3 && /^[^aeiou]+$/i.test(str);
  }

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    // --- Check project list ---
    let found = false; // no results 

    if (!found) {
      if (isGibberish(query)) {
        feedback.innerHTML = `<img src="realfunny.gif" alt="Funny gif" style="max-width:200px; border-radius:10%;">`;
      } else {
        feedback.innerHTML = `<img src="notfound.gif" alt="Not found gif" style="max-width:200px; border-radius:10%;">`;
      }
    } else {
      feedback.innerHTML = "";
    }
  });
