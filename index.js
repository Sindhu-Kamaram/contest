let originalData;

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
)
  .then((response) => response.json())
  .then((data) => {
    renderTable(data);
    originalData = data;
  })
  .catch((error) => {
    console.log("Error:", error);
  });

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await response.json();
    renderTable(data);
    originalData = data;
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchData();

function renderTable(data) {
  const tableBody = document.getElementById("data-body");
  tableBody.innerHTML = "";
  const tbody = document.getElementById("data-body");

  data.forEach((coin) => {
    const row = document.createElement("tr");

    const image = document.createElement("td");
    img = document.createElement("img");
    image.appendChild(img);
    img.src = coin.image;
    row.appendChild(image);

    const nameCell = document.createElement("td");
    nameCell.textContent = coin.name;
    row.appendChild(nameCell);

    const symbolCell = document.createElement("td");
    symbolCell.textContent = coin.symbol;
    row.appendChild(symbolCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${coin.current_price}`;
    row.appendChild(priceCell);

    const volume = document.createElement("td");
    volume.textContent = `$${coin.total_volume}`;
    row.appendChild(volume);

    const percent = document.createElement("td");
    percent.textContent = coin.price_change_percentage_24h;
    row.appendChild(percent);

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = `Mkt Cap : $${coin.market_cap}`;
    row.appendChild(marketCapCell);

    tbody.appendChild(row);
  });
}

function sortDataByMkt() {
  const tableBody = document.getElementById("data-body");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((a, b) => {
    const marketCapA = extractNumericValue(a.cells[6].textContent);
    const marketCapB = extractNumericValue(b.cells[6].textContent);
    return marketCapA - marketCapB;
  });

  rows.forEach((row) => tableBody.appendChild(row));
}

function extractNumericValue(str) {
  const numericValue = parseFloat(str.replace(/[^\d.]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
}

function sortDataByPercent() {
  const tableBody = document.getElementById("data-body");
  const rows = Array.from(tableBody.getElementsByTagName("tr"));

  rows.sort((a, b) => {
    const marketCapA = extractNumericValue(a.cells[5].textContent);
    const marketCapB = extractNumericValue(b.cells[5].textContent);
    return marketCapA - marketCapB;
  });

  rows.forEach((row) => tableBody.appendChild(row));
}

function filterAndRenderData(searchInput) {
  const filteredData = originalData.filter((coin) => {
    const nameMatch = coin.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const symbolMatch = coin.symbol
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return nameMatch || symbolMatch;
  });
  const tableBody = document.getElementById("data-body");
  tableBody.innerHTML = "";
  renderTable(filteredData);
}

document
  .getElementById("search-bar")
  .addEventListener("input", function (event) {
    const searchInput = event.target.value;
    if (searchInput.trim() != "") {
      filterAndRenderData(searchInput);
    } else {
      renderTable(originalData);
    }
  });
