let currentPage = 1;
const totalPages = 10;

function showPage(page) {
  // hide all pages
  document.querySelectorAll(".page-container").forEach(div => {
    div.classList.remove("active");
  });

  // show selected page
  document.getElementById(`container-${page}`).classList.add("active");

  // update indicator
  document.querySelector(".page-indicator").textContent = `Page ${page}`;
}

function nextPage() {
  currentPage++;
  if (currentPage > totalPages) currentPage = 1;
  showPage(currentPage);
}

function prevPage() {
  currentPage--;
  if (currentPage < 1) currentPage = totalPages;
  showPage(currentPage);
}

// initialize
showPage(currentPage);
