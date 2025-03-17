//Get ⚡ All Data

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

// get All Words
const getAllWords = () => {
  const url = `https://openapi.programming-hero.com/api/words/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getWordById(data.data));
};

// get the word by id
const getWordById = (wordId, modalId) => {
  fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then((res) => res.json())
    .then((data) => {
      // Call a function to update the modal with the word details
      updateModalContent(data.data, modalId);
    })
    .catch((error) => {
      console.error("Error fetching word details:", error);
    });
};

// pronounceWord
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US"; // English
  window.speechSynthesis.speak(utterance);
}

// display Levels Words
const displayAllLevelsWords = (levels) => {
  const vocabCard = document.getElementById("vocabCard");
  vocabCard.innerHTML = "";

  // Length 6 is showed by slicing
  if (levels) {
    levels.data.slice(0, 6).forEach((level) => {
      const div = document.createElement("div");

      const modalId = `my_modal_${level.id}`;
      div.innerHTML = `<div class="card bg-base-100 shadow-lg py-12  ">
            <figure class="flex-col items-center">
              <h2 class="text-2xl font-bold">${level.word}</h2>
              <p class="text-xl font-semibold my-4">Meaning /Pronounciation</p>
              <h2 class="text-2xl font-bold">"${
                level.meaning ? ` ${level.meaning}` : "Not Found"
              } / ${level.pronunciation} "</h2>
            </figure>
            <!-- Modal  -->
            <div id="modalContainer" class="flex justify-around items-center my-8 ">
              <div  onclick="getWordById('${level.id}', '${modalId}')">
                <button class="btn modal-info-btn" data-modal-id="${modalId}">
                  <i class="fa-solid fa-circle-info cursor-pointer"> </i>
                </button>
                <dialog id="${modalId}" class="modal">
                  <div class="modal-box">
                    <h3 id="${modalId}-meaning" class="text-2xl font-bold mb-4">Meaning</h3>
                    <p id="${modalId}-details" class="text-lg"></p>
                    <hr class="my-4" />
                    <h3 id="${modalId}-sentence-title" class="text-xl font-bold">Sentence</h3>
                    <p id="${modalId}-sentence" class="py-4">
                      
                    </p>
                    <h2 id="${modalId}-synonyms-title" class="text-2xl font-bold my-4">সমার্থক শব্দ গুলো</h2>
                    <div id="${modalId}-synonyms"></div>
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
              <button onclick="pronounceWord('${level.word}')" class="btn">
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

// form validation
function validateForm(event) {
  event.preventDefault();
  const heroSection = document.getElementById("heroSection");
  const vocabulariesSection = document.getElementById("vocabulariesSection");
  const faqSection = document.getElementById("faqSection");
  const nameInput = document.querySelector("input[type='text']");
  const passwordInput = document.querySelector("input[type='password']");
  if (nameInput.value.trim() === "") {
    Swal.fire({
      title: "Oops...",
      text: "Please enter your name.",
      icon: "question",
    });
    return false;
  }
  if (passwordInput.value !== "123456") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Incorrect password! The correct password is '123456'.",
    });
    nameInput.value = "";
    passwordInput.value = "";
    return false;
  }
  nameInput.value = "";
  passwordInput.value = "";
  Swal.fire({
    title: "Form submitted successfully!",
    icon: "success",
    draggable: true,
  });

  // alert("");
  // heroSection.classList.add("hidden");
  vocabulariesSection.classList.remove("hidden");
  faqSection.classList.remove("hidden");
  return true;
}

// Function to update the modal content
const updateModalContent = (wordData, modalId) => {
  if (!wordData) {
    console.error("No word data provided to updateModalContent");
    return;
  }
  const meaningElement = document.getElementById(`${modalId}-details`);
  const sentenceElement = document.getElementById(`${modalId}-sentence`);
  const synonymsContainer = document.getElementById(`${modalId}-synonyms`);

  if (meaningElement) {
    meaningElement.textContent = wordData.meaning || "Meaning not available";
  }
  if (sentenceElement) {
    sentenceElement.textContent = wordData.sentence || "Sentence not available";
  }
  if (synonymsContainer) {
    synonymsContainer.innerHTML = "";
    if (wordData.synonyms && wordData.synonyms.length > 0) {
      wordData.synonyms.forEach((synonym) => {
        const synonymButton = document.createElement("button");
        synonymButton.classList.add("btn", "m-2");
        synonymButton.textContent = synonym;
        synonymsContainer.appendChild(synonymButton);
      });
    } else {
      const noSynonyms = document.createElement("p");
      noSynonyms.textContent = "No synonyms available.";
      synonymsContainer.appendChild(noSynonyms);
    }
  }
};

loadAllCategories();
