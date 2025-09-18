document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const totalPages = 10; // adjust if needed
  const pageIndicator = document.querySelector(".page-indicator");

  function showPage(pageNum) {
    const allItems = document.querySelectorAll('[class*="page-"]');

    allItems.forEach(item => {
      if (item.classList.contains(`page-${pageNum}`)) {
        item.style.display = "block"; // visible
      } else {
        item.style.display = "none"; // gone from layout
      }
    });

    // Update span text
    pageIndicator.textContent = `Page ${pageNum}`;
  }

  // Expose controls to HTML buttons
  window.nextPage = function () {
    currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
    showPage(currentPage);
  };

  window.prevPage = function () {
    currentPage = currentPage <= 1 ? totalPages : currentPage - 1;
    showPage(currentPage);
  };

  // Start on page 1
  showPage(currentPage);
});
