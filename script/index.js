//Get ⚡ All Levels
//https://openapi.programming-hero.com/api/levels/all

const loadAllLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLevels(data.data));
};

const displayAllLevels = (levels) => {
  const vocabularies = document.getElementById("vocabularies");
  vocabularies.textContent = "";
  console.log(levels);
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.innerHTML = `
        <button
              class="btn btn-outline border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
            >
              <img src="assets/fa-book-open.png" alt="" /> Lesson -1
            </button>
      
        `;
    vocabularies.appendChild(button);
    console.log(level.id);
  });
};

loadAllLevels();
