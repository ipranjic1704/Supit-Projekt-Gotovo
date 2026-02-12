document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const iframe = document.getElementById("contact-target");
  const contactModal = document.getElementById("contact-modal");
  const contactModalClose = document.getElementById("contact-modal-close");
  const statusEl = document.getElementById("contact-status");

  if (!contactForm || !iframe || !contactModal || !statusEl) return;

  statusEl.textContent = "";

  contactForm.addEventListener("submit", () => {
    statusEl.style.color = "lightgray";
    statusEl.textContent = "Šaljem poruku...";
  });

  iframe.addEventListener("load", () => {
    const fullName = contactForm.elements["FullName"].value.trim();
    const email = contactForm.elements["Email"].value.trim();
    const message = contactForm.elements["Message"].value.trim();

    if (!fullName && !email && !message && statusEl.textContent === "") {
      return;
    }

    contactForm.reset();
    statusEl.style.color = "lightgreen";
    statusEl.textContent = "Poruka je uspješno poslana.";

    contactModal.style.display = "block";
    contactModal.setAttribute("aria-hidden", "false");
  });

  if (contactModalClose) {
    contactModalClose.addEventListener("click", () => {
      contactModal.style.display = "none";
      contactModal.setAttribute("aria-hidden", "true");
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === contactModal) {
      contactModal.style.display = "none";
      contactModal.setAttribute("aria-hidden", "true");
    }
  });
});
