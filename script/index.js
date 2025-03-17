//Get ⚡ All Levels
//https://openapi.programming-hero.com/api/levels/all

// fetching categories
const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllCategories(data.data));
};

// fatching level wiht the clicked button
const wrodsByLevelCategories = (levelId) => {
  fetch(`https://openapi.programming-hero.com/api/level/${levelId}`)
    .then((res) => res.json())
    .then((data) => displayAllLevelsWords(data));
};

// display Levels Words
const displayAllLevelsWords = (levels) => {
  console.log(levels.data);
  const vocabCard = document.getElementById("vocabCard");
  vocabCard.textContent = "";
  // Length 6 is showed by slicing
  if (levels) {
    levels.data.slice(0, 6).forEach((level) => {
      const div = document.createElement("div");
      console.log(level);
      div.innerHTML = `<div class="card bg-base-100 shadow-lg py-12">
            <figure class="flex-col items-center">
              <h2 class="text-2xl font-bold">${level.word}</h2>
              <p class="text-xl font-semibold my-4">Meaning /Pronounciation</p>
              <h2 class="text-2xl font-bold">"${level.meaning} / ${level.pronunciation}"</h2>
            </figure>
            <div class="flex justify-around items-center my-8">
              <i class="fa-solid fa-circle-info cursor-pointer"></i>
              <i class="fa-solid fa-volume-high cursor-pointer"></i>
            </div>
          </div>`;
      vocabCard.appendChild(div);
    });
  }
  if (levels.data.length > 0) {
    const initialDiv = document.getElementById("initialDiv");
    initialDiv.classList.add("hidden");
  }
  if (levels.data.length === 0) {
    const epmtyDiv = document.getElementById("emptyDiv");
    epmtyDiv.classList.remove("hidden");
  }
};

// display categories
const displayAllCategories = (levels) => {
  const vocabularies = document.getElementById("vocabularies");
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "my-10",
    "gap-5",
    "flex-wrap"
  );
  // vocabularies.textContent = "";
  // console.log(levels);
  levels.forEach((level) => {
    const div = document.createElement("div");
    div.innerHTML = ` <button 
            class="btn btn-outline border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
             onclick="wrodsByLevelCategories('${level.level_no}')"
          > 
            ${level.lessonName} -  ${level.level_no} 

          </button> `;

    buttonContainer.appendChild(div);
  });

  vocabularies.appendChild(buttonContainer);
};

loadAllCategories();
