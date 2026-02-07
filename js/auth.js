document.addEventListener("DOMContentLoaded", () => {
  const nastavniPlanSection = document.getElementById("nastavni-plan");
  const navLinks = document.querySelectorAll("#main-nav a");
  const navNastavniPlan = document.getElementById("nav-nastavni-plan");
  const loginMessage = document.getElementById("login-message");
  const registerForm = document.getElementById("register-form");
  const registerMessage = document.getElementById("register-message");
  const loginForm = document.getElementById("login-form");
  const loginMessageEl = document.getElementById("login-message");

  function updateAuthUI() {
    const token = getToken();

    if (token) {
      if (nastavniPlanSection) nastavniPlanSection.style.display = "block";
      if (navNastavniPlan) navNastavniPlan.style.display = "list-item";

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#prijava") {
          link.textContent = "Odjava";
        }
      });

      if (loginMessage) {
        loginMessage.style.color = "lightgreen";
        loginMessage.textContent = "Prijava uspješna.";
      }

      if (curriculumTableBody) curriculumTableBody.innerHTML = "";
      if (typeof recalculateTotals === "function") recalculateTotals();
      if (selectedCourseIds) selectedCourseIds.clear();
      if (suggestionsContainer) {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
      }
      if (typeof fetchCurriculumList === "function") fetchCurriculumList();
    } else {
      if (nastavniPlanSection) nastavniPlanSection.style.display = "none";
      if (navNastavniPlan) navNastavniPlan.style.display = "none";

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#prijava") {
          link.textContent = "Prijava";
        }
      });

      if (loginMessage) loginMessage.textContent = "";

      if (curriculumTableBody) curriculumTableBody.innerHTML = "";
      if (typeof recalculateTotals === "function") recalculateTotals();
      if (selectedCourseIds) selectedCourseIds.clear();
      if (suggestionsContainer) {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
      }
    }
  }

  updateAuthUI();
  window.updateAuthUI = updateAuthUI;

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document
        .getElementById("register-username")
        .value.trim();
      const password = document.getElementById("register-password").value;

      registerMessage.textContent = "";

      try {
        const response = await fetch(`${API_BASE}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok || data.isSuccess === false) {
          throw new Error(data.message || "Registracija nije uspjela.");
        }

        registerMessage.style.color = "lightgreen";
        registerMessage.textContent =
          "Registracija uspješna. Sada se možete prijaviti.";
        registerForm.reset();
      } catch (err) {
        registerMessage.style.color = "salmon";
        registerMessage.textContent = err.message;
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;

      loginMessageEl.textContent = "";

      try {
        const response = await fetch(`${API_BASE}/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok || data.isSuccess === false) {
          throw new Error(data.message || "Prijava nije uspjela.");
        }

        let token = null;
        if (data.data && data.data.token) token = data.data.token;
        else if (data.token) token = data.token;

        if (!token) {
          throw new Error("Nije vraćen token s poslužitelja.");
        }

        setToken(token);
        loginForm.reset();
        updateAuthUI();
      } catch (err) {
        loginMessageEl.style.color = "salmon";
        loginMessageEl.textContent = err.message;
      }
    });
  }

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === "#prijava") {
      link.addEventListener("click", (e) => {
        const token = getToken();
        if (token) {
          e.preventDefault();
          localStorage.removeItem("jwtToken");
          updateAuthUI();
          alert("Uspješno ste odjavljeni.");
        }
      });
    }
  });
});
