console.log("I am on");

const feed = document.querySelector(".feed-area");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

let currentPage = 1;
const itemsPerPage = 6;
let articles = [];

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error("Articles data not available");
    }

    articles = data.articles;
    showData();
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    feed.innerHTML = `<p style="color:red;">Failed to load news.</p>`;
  });

function showData() {
  feed.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = articles.slice(start, end);

  pageData.forEach((article) => {
    feed.innerHTML += `
      <div class="feed">
        <img
          id="newsImg"
          src="${article.urlToImage || "https://via.placeholder.com/300"}"
          alt="News image"
        />
        <div class="feed-description">
          <h4>${article.title || "No title available"}</h4>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">
            <button>Read More</button>
          </a>
        </div>
      </div>
    `;
  });
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * itemsPerPage >= articles.length;
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
