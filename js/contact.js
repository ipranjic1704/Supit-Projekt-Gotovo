// js/contact.js
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const iframe = document.getElementById("contact-target");
  const contactModal = document.getElementById("contact-modal");
  const contactModalClose = document.getElementById("contact-modal-close");
  const statusEl = document.getElementById("contact-status");

  if (!contactForm || !iframe || !contactModal || !statusEl) return;

  // pri učitavanju stranice status je prazan
  statusEl.textContent = "";

  // 1) Submit – samo kratka poruka da se šalje
  contactForm.addEventListener("submit", () => {
    statusEl.style.color = "lightgray";
    statusEl.textContent = "Šaljem poruku...";
  });

  // 2) Kad se iframe učita nakon slanja
  iframe.addEventListener("load", () => {
    // provjerimo je li forma imala ikakav sadržaj prije slanja
    // (sprječava prikaz na prvom loadu stranice)
    const fullName = contactForm.elements["FullName"].value.trim();
    const email = contactForm.elements["Email"].value.trim();
    const message = contactForm.elements["Message"].value.trim();

    // ako su sva tri polja prazna, ovo je vjerojatno inicijalni load -> ignoriraj
    if (!fullName && !email && !message && statusEl.textContent === "") {
      return;
    }

    // tretiramo kao uspješno slanje
    contactForm.reset();
    statusEl.style.color = "lightgreen";
    statusEl.textContent = "Poruka je uspješno poslana.";

    contactModal.style.display = "block";
    contactModal.setAttribute("aria-hidden", "false");
  });

  // 3) Zatvaranje modala na X
  if (contactModalClose) {
    contactModalClose.addEventListener("click", () => {
      contactModal.style.display = "none";
      contactModal.setAttribute("aria-hidden", "true");
    });
  }

  // 4) Zatvaranje modala klikom izvan sadržaja
  window.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.style.display = "none";
      contactModal.setAttribute("aria-hidden", "true");
    }
  });
});
