//Get ⚡ All Levels
//https://openapi.programming-hero.com/api/levels/all

const loadAllLevels = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayAllLevels(data.data));
};

const displayAllLevels = (levels) => {
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
  vocabularies.textContent = ""; // Clear existing content

  levels.forEach((level) => {
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "btn-outline",
      "border",
      "border-blue-700",
      "text-blue-700",
      "hover:bg-blue-700",
      "hover:text-white"
    );
    button.innerHTML = `<img src="assets/fa-book-open.png" alt="" /> Lesson -${level.level_no}`;
    buttonContainer.appendChild(button);
    console.log(level);
  });
  vocabularies.appendChild(buttonContainer);
};

loadAllLevels();
