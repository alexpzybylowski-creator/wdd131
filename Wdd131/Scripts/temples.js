const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {

        menuButton.textContent = "✕";

        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    } else {

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }
});


// Current year

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// Last modified date

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;