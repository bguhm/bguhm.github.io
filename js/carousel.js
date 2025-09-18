document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const totalPages = 10; // change if you have more/less
  const pageIndicator = document.querySelector(".page-indicator");
  const allPages = document.querySelectorAll("[class*='page-']");

  function showPage(pageNumber) {
    // Hide all
    allPages.forEach(div => {
      div.style.display = "none";
    });

    // Show selected
    const selected = document.querySelectorAll(`.page-${pageNumber}`);
    selected.forEach(div => {
      div.style.display = "block";
    });

    // Update indicator text
    pageIndicator.textContent = `Page ${pageNumber}`;
  }

  // Global functions for your arrows
  window.nextPage = function() {
    currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
    showPage(currentPage);
  };

  window.prevPage = function() {
    currentPage = currentPage <= 1 ? totalPages : currentPage - 1;
    showPage(currentPage);
  };

  // Default load
  showPage(currentPage);
});
