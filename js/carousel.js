<script>
document.addEventListener("DOMContentLoaded", () => {
  const pageControls = document.querySelectorAll(".page-control");
  const allPages = document.querySelectorAll("[class*='page-']");

  function showPage(pageNumber) {
    // Hide all
    allPages.forEach(div => {
      div.style.display = "none";
    });

    // Show only selected page
    const selected = document.querySelectorAll(`.page-${pageNumber}`);
    selected.forEach(div => {
      div.style.display = "block";
    });
  }

  // Attach click listeners to header spans
  pageControls.forEach(control => {
    control.addEventListener("click", () => {
      const pageNumber = control.getAttribute("data-page");
      showPage(pageNumber);
    });
  });

  // Default to Page 1
  showPage(1);
});
</script>
