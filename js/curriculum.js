let allCourses = [];
const selectedCourseIds = new Set();

let curriculumTableBody;
let totalEctsCell;
let totalHoursCell;
let curriculumInput;
let suggestionsContainer;
let curriculumToggle;

function recalculateTotals() {
  let totalEcts = 0;
  let totalHours = 0;

  const rows = curriculumTableBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const ects = parseFloat(row.children[1].textContent) || 0;
    const hours = parseFloat(row.children[2].textContent) || 0;
    totalEcts += ects;
    totalHours += hours;
  });

  totalEctsCell.textContent = totalEcts;
  totalHoursCell.textContent = totalHours;
}

async function addCourseToTableById(id) {
  const token = getToken();
  if (!token) return;

  try {
    const response = await fetch(`${API_BASE}/supit/get-curriculum/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();

    if (!response.ok || result.isSuccess === false) {
      throw new Error(result.message || "Ne mogu dohvatiti detalje kolegija.");
    }

    const c = result.data;
    if (!c) return;

    if (selectedCourseIds.has(c.id)) {
      return;
    }
    selectedCourseIds.add(c.id);

    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = c.kolegij;

    const tdEcts = document.createElement("td");
    tdEcts.textContent = c.ects || 0;

    const tdHours = document.createElement("td");
    tdHours.textContent = c.sati || 0;

    const tdAction = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Ukloni";
    removeBtn.className = "remove-course-btn";
    removeBtn.addEventListener("click", () => {
      tr.remove();
      recalculateTotals();
      selectedCourseIds.delete(c.id);
      const query = curriculumInput.value.trim();
      if (query) {
        showSuggestions(query);
      }
    });
    tdAction.appendChild(removeBtn);

    tr.appendChild(tdName);
    tr.appendChild(tdEcts);
    tr.appendChild(tdHours);
    tr.appendChild(tdAction);

    curriculumTableBody.appendChild(tr);
    recalculateTotals();
  } catch (err) {
    console.error("Greška pri dohvaćanju kolegija:", err);
  }
}

function showSuggestions(query) {
  if (!suggestionsContainer) return;

  suggestionsContainer.innerHTML = "";

  const lower = (query || "").toLowerCase();

  const matches = allCourses
    .filter(
      (c) =>
        c.kolegij &&
        !selectedCourseIds.has(c.id) &&
        c.kolegij.toLowerCase().includes(lower),
    )
    .slice(0, 50);

  matches.forEach((course) => {
    const item = document.createElement("div");
    item.className = "autocomplete-item";
    item.textContent = course.kolegij;
    item.addEventListener("click", () => {
      curriculumInput.value = "";
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
      addCourseToTableById(course.id);
    });
    suggestionsContainer.appendChild(item);
  });

  suggestionsContainer.style.display = matches.length ? "block" : "none";
}

async function fetchCurriculumList() {
  const token = getToken();
  if (!token) {
    console.log("Nema tokena – ne dohvaćam kolegije.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/supit/curriculum-list/hr`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok || data.isSuccess === false) {
      throw new Error(data.message || "Ne mogu dohvatiti listu kolegija.");
    }

    allCourses = data.data || [];
  } catch (err) {
    console.error("Greška pri dohvaćanju kolegija:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  curriculumTableBody = document.querySelector("#curriculum-table tbody");
  totalEctsCell = document.getElementById("total-ects");
  totalHoursCell = document.getElementById("total-hours");
  curriculumInput = document.getElementById("curriculum-input");
  suggestionsContainer = document.getElementById("curriculum-suggestions");
  curriculumToggle = document.getElementById("curriculum-toggle");

  if (curriculumInput) {
    curriculumInput.addEventListener("input", () => {
      const query = curriculumInput.value.trim();
      if (query) {
        showSuggestions(query);
      } else {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
      }
    });
  }

  if (curriculumToggle) {
    curriculumToggle.addEventListener("click", () => {
      if (suggestionsContainer.style.display === "block") {
        suggestionsContainer.style.display = "none";
        suggestionsContainer.innerHTML = "";
      } else {
        showSuggestions("");
      }
    });
  }
});
