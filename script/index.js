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
    .then((data) => displayAllLevelsWords(data, undefined));
};

// get All Words
const getAllWords = () => {
  const url = `https://openapi.programming-hero.com/api/words/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getWordById(data.data));
};

// get the word by id
const getWordById = (wordId) => {
  console.log(wordId);
  fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};

// display Levels Words
const displayAllLevelsWords = (levels, wordId) => {
  console.log(levels);
  const vocabCard = document.getElementById("vocabCard");
  vocabCard.innerHTML = "";

  // Length 6 is showed by slicing

  if (levels) {
    levels.data.slice(0, 6).forEach((level) => {
      const div = document.createElement("div");
      console.log(level);
      div.innerHTML = `<div class="card bg-base-100 shadow-lg py-12">
            <figure class="flex-col items-center">
              <h2 class="text-2xl font-bold">${level.word}</h2>
              <p class="text-xl font-semibold my-4">Meaning /Pronounciation</p>
              <h2 class="text-2xl font-bold">"${level.meaning} / ${level.pronunciation} "</h2>
            </figure>
            <!-- Modal  -->
            <div id="modalContainer" class="flex justify-around items-center my-8 ">
              <div onclick="getWordById('${level.id}')">
                <button class="btn modal-info-btn" data-modal-id="my_modal_1">
                  <i class="fa-solid fa-circle-info cursor-pointer"> </i>
                </button>
                <dialog id="my_modal_1" class="modal">
                  <div class="modal-box">
                    <h3 class="text-2xl font-bold mb-4">Meaning</h3>
                    <p class="text-lg">আগ্রহী</p>
                    <hr class="my-4" />
                    <h3 class="text-xl font-bold">Sentence</h3>
                    <p class="py-4">
                      Press ESC key or click the button below to close
                    </p>
                    <h2 class="text-2xl font-bold my-4">সমার্থক শব্দ গুলো</h2>
                    <button class="btn m-2">1</button>
                    <div class="my-5">
                      <form method="dialog">
                        <button
                          class="btn btn-outline border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
                        >
                          Complete Learning
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
              <button class="btn">
                <i class="fa-solid fa-volume-high cursor-pointer"></i>
              </button>
            </div>
          </div>`;
      vocabCard.appendChild(div);
    });
  }
  if (levels.data.length > 0) {
    const initialDiv = document.getElementById("initialDiv");
    const epmtyDiv = document.getElementById("emptyDiv");
    epmtyDiv.classList.add("hidden");
    initialDiv.classList.add("hidden");
  }
  if (levels.data.length === 0) {
    const epmtyDiv = document.getElementById("emptyDiv");
    epmtyDiv.classList.remove("hidden");
  }

  // Add event listeners for modal buttons AFTER they are added to the DOM
  const modalButtons = document.querySelectorAll(".modal-info-btn");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modalId;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });
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
