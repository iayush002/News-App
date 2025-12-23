console.log("I am on");
let feed = document.querySelector(".feed-area");

const url =
  "https://newsapi.org/v2/everything?q=apple&from=2025-12-09&to=2025-12-09&sortBy=popularity&apiKey=dc397683b8884a17958b72cdf012d1f5";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.articles);
    let currentPage = 1;
    let itemPerPage = 6;
    function showData() {
      const output = document.querySelector(".feed-area");
      output.innerHTML = "";

      const start = (currentPage - 1) * itemPerPage;
      const end = start + itemPerPage;
      const pageData = data.articles.slice(start, end);

      pageData.forEach((element) => {
        output.innerHTML += `
          <div class="feed">
            <img
              id="newsImg"
              src="${element.urlToImage}"
              alt="Picture related to event"
            />
            <div class="feed-description">
              <h4>${element.title}</h4>
              <p>
              ${element.description}
              </p>
              <a href="${element.url}" target="_blank"><button>Read More</button></a>
            </div>
          </div>
          `;
      });
    }
    showData();

    document.querySelector(".next").onclick = () => {
      if (currentPage * itemPerPage < data.articles.length) {
        currentPage++;
        showData();
      }
    };

    document.querySelector(".prev").onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        showData();
      }
    };
  })
  .catch((error) => {
    console.log(error);
  });
