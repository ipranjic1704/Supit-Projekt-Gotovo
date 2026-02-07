// js/lightbox.js – Ishod 4 s navigacijom i logovima
document.addEventListener("DOMContentLoaded", () => {
  console.log("lightbox.js loaded");

  const overlay = document.getElementById("lightbox-overlay");
  const lightboxImg = document.getElementById("lightbox-image");
  const closeBtn = document.getElementById("lightbox-close");

  if (!overlay || !lightboxImg || !closeBtn) {
    console.warn("Lightbox elementi nedostaju.");
    return;
  }

  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));
  console.log("Broj lightbox-trigger slika:", triggers.length);

  let currentIndex = -1;

  function openLightbox(index) {
    if (index < 0 || index >= triggers.length) return;

    currentIndex = index;
    const img = triggers[currentIndex];

    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";

    lightboxImg.src = src;
    lightboxImg.alt = alt;

    overlay.style.display = "block";
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    currentIndex = -1;
  }

  function showNext() {
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % triggers.length;
    openLightbox(nextIndex);
  }

  function showPrev() {
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    openLightbox(prevIndex);
  }

  // klik na thumbnail
  triggers.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      console.log("Klik na sliku index:", index);
      openLightbox(index);
    });
  });

  // zatvaranje
  closeBtn.addEventListener("click", () => {
    console.log("Lightbox close (X)");
    closeLightbox();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      console.log("Lightbox close (click overlay)");
      closeLightbox();
    }
  });

  // tipkovnica: ESC, lijevo, desno
  window.addEventListener("keydown", (e) => {
    if (overlay.style.display !== "block") return;

    if (e.key === "Escape") {
      console.log("Lightbox close (Escape)");
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      console.log("Lightbox next (ArrowRight)");
      showNext();
    } else if (e.key === "ArrowLeft") {
      console.log("Lightbox prev (ArrowLeft)");
      showPrev();
    }
  });
});
