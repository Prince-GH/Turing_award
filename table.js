let awardData = [];
let currentPage = 1;
const itemsPerPage = 8;

// Load JSON once
async function loadAwards() {
  const response = await fetch("turing_award.json");
  awardData = await response.json();
  render();
}

// Render full system (cards + pagination)
function render() {
  renderAwards();
  renderPagination();
}

// Render cards for the current page
function renderAwards() {
  const container = document.getElementById("award-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const sliced = awardData.slice(start, end);

  sliced.forEach(item => {
    container.innerHTML += `
      <div class="award-card">
        <img src="${item.Photo}" alt="${item.Name}">
        <h3>${item.Name}</h3>
        <div class="year">${item.Year}</div>
        <div class="institute">${item["Affiliated institute(s)"]}</div>
        <div class="rationale">${item.Rationale}</div>
      </div>
    `;
  });
}

// Pagination buttons
function renderPagination() {
  const totalPages = Math.ceil(awardData.length / itemsPerPage);
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";

  // Prev button
  pag.innerHTML += `
    <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>
      Prev
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    pag.innerHTML += `
      <button 
        onclick="goToPage(${i})"
        class="${i === currentPage ? "active" : ""}"
      >${i}</button>
    `;
  }

  // Next button
  pag.innerHTML += `
    <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>
      Next
    </button>
  `;
}

function goToPage(n) {
  const totalPages = Math.ceil(awardData.length / itemsPerPage);
  if (n < 1 || n > totalPages) return;
  currentPage = n;
  render();
}

// Sorting logic
function sortAwards(type) {
  switch (type) {
    case "year-desc":
      awardData.sort((a, b) => b.Year - a.Year);
      break;

    case "year-asc":
      awardData.sort((a, b) => a.Year - b.Year);
      break;

    case "name-asc":
      awardData.sort((a, b) => a.Name.localeCompare(b.Name));
      break;

    case "name-desc":
      awardData.sort((a, b) => b.Name.localeCompare(a.Name));
      break;
  }

  currentPage = 1; // reset to page 1 after sort
  render();
}

document.getElementById("sort-select").addEventListener("change", (e) => {
  sortAwards(e.target.value);
});

loadAwards();
