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
        let contactInfo = `
            <div class="contactContainer" style="
				margin-top: 24px;
				padding: 24px;
				background-color: #F1F4F8;
				border-radius: 12px;
			">
              <p style="
				color: #293C5C;
				text-transform: uppercase;
				font-weight: 700;
				margin-bottom: 0;
			">Contact information</p>
              ${director.mail ? `<div><strong>Email:</strong> ${director.mail}</div>` : ""}
              ${director.phone ? `<div><strong>Phone:</strong> ${director.phone}</div>` : ""}
              ${director.twitter ? `<div><strong>Twitter:</strong> ${director.twitter}</div>` : ""}
            </div>
          `;
        content.innerHTML = `
          <div class="container">
            <div class="row pb-4 pt-2">
              <div class="col-md-6 d-none d-md-block">
                ${director.image ? `<img src="${director.image}" alt="${director.name}" />` : ""}
                ${contactInfo}
              </div>
              <div class="col-md-6">
                <h2>${director.name}</h2>
                <p>${director.bio || "No biography available."}</p>
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