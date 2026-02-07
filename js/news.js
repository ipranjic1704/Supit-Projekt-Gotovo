document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll(".novost-toggle");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const fullTextDiv = document.getElementById(targetId);

      if (!fullTextDiv) return;

      if (fullTextDiv.style.display === "block") {
        fullTextDiv.style.display = "none";
        button.textContent = "Pročitaj više";
      } else {
        fullTextDiv.style.display = "block";
        button.textContent = "Prikaži manje";
      }
    });
  });

  const oNamaToggle = document.getElementById("o-nama-toggle");
  const oNamaFull = document.getElementById("o-nama-full");

  if (oNamaToggle && oNamaFull) {
    oNamaToggle.addEventListener("click", () => {
      if (oNamaFull.style.display === "block") {
        oNamaFull.style.display = "none";
        oNamaToggle.textContent = "Prikaži cijeli tekst";
      } else {
        oNamaFull.style.display = "block";
        oNamaToggle.textContent = "Sakrij tekst";
      }
    });
  }
});
