console.log("JS LOADED");

const feed = document.querySelector(".feed-area");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentPage = 1;
const itemsPerPage = 6;
let articles = [];

const url = "https://api.spaceflightnewsapi.net/v4/articles/";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    articles = data.results;
    showData();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    feed.innerHTML = "<p>Failed to load news.</p>";
  });

function showData() {
  feed.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = articles.slice(start, end);

  pageData.forEach((item) => {
    feed.innerHTML += `
      <div class="feed">
        <img
          src="${item.image_url || ""}"
          alt="News image"
        />
        <div class="feed-description">
          <h4>${item.title}</h4>
          <p>${item.summary}</p>
          <a href="${item.url}" target="_blank">
            <button>Read More</button>
          </a>
        </div>
      </div>
    `;
  });
}

nextBtn.addEventListener("click", () => {
  if (currentPage * itemsPerPage < articles.length) {
    currentPage++;
    showData();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showData();
  }
});
