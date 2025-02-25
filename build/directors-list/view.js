/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/directors-list/view.js ***!
  \************************************/
document.addEventListener("DOMContentLoaded", function () {
  const dataDiv = document.getElementById("directors-data");
  if (!dataDiv) return;
  try {
    const directorsData = JSON.parse(dataDiv.getAttribute("data-json"));
    const items = document.querySelectorAll(".director-item");
    const details = document.querySelector(".director-details");
    const content = document.querySelector(".director-content");
    const backButton = document.querySelector(".back-button");
    const container = document.querySelector(".directors-container");
    items.forEach(item => {
      item.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const director = directorsData[index];
        content.innerHTML = `
          <div class="container">
            <div class="row pb-4 pt-2">
              <div class="col-md-6 d-none d-md-block">
                ${director.image ? `<img src="${director.image}" alt="${director.name}" />` : ""}
              </div>
              <div class="col-md-6">
                <h1 class="border-bottom-light mt-0">${director.name}</h1>
                <p>${director.descriptionFull}</p>
              </div>
            </div>
          </div>
        `;
        container.style.display = "none";
        details.classList.remove("hidden");
      });
    });
    backButton.addEventListener("click", function () {
      container.style.display = "flex";
      details.classList.add("hidden");
    });
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map