document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const totalPages = 10; // adjust if needed
  const pageIndicator = document.querySelector(".page-indicator");
  const allPages = document.querySelectorAll("[class*='page-']");

  function showPage(pageNumber) {
    // Hide all page divs
    allPages.forEach(div => {
      div.style.display = "none";
    });

    // Show only the selected page
    document.querySelectorAll(`.page-${pageNumber}`).forEach(div => {
      div.style.display = "block";
    });

    // Update span text
    pageIndicator.textContent = `Page ${pageNumber}`;
  }

  // Make functions global
  window.nextPage = function() {
    currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
    showPage(currentPage);
  };

  window.prevPage = function() {
    currentPage = currentPage <= 1 ? totalPages : currentPage - 1;
    showPage(currentPage);
  };

  // Start on page 1
  showPage(currentPage);
});
