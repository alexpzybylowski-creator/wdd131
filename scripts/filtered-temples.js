const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Additional temple 1
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-22252-main.jpg"
    },

    // Additional temple 2
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil/sao-paulo-brazil-temple-4547-main.jpg"
    },

    // Additional temple 3
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy/rome-italy-temple-1307-main.jpg"
    }
];

const templeGrid = document.querySelector("#temple-grid");


function displayTemples(templeList) {

    templeGrid.innerHTML = "";

    templeList.forEach((temple) => {

        const figure = document.createElement("figure");

        const image = document.createElement("img");

        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";

        const figcaption = document.createElement("figcaption");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML =
            `<span>LOCATION:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML =
            `<span>DEDICATED:</span> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML =
            `<span>SIZE:</span> ${temple.area.toLocaleString()} sq ft`;

        figcaption.appendChild(name);
        figcaption.appendChild(location);
        figcaption.appendChild(dedicated);
        figcaption.appendChild(area);

        figure.appendChild(figcaption);
        figure.appendChild(image);

        templeGrid.appendChild(figure);
    });
}


function filterTemples(type) {

    let filteredTemples = temples;

    if (type === "old") {

        filteredTemples = temples.filter((temple) => {

            const year = Number(temple.dedicated.split(",")[0]);

            return year < 1900;
        });
    }

    else if (type === "new") {

        filteredTemples = temples.filter((temple) => {

            const year = Number(temple.dedicated.split(",")[0]);

            return year > 2000;
        });
    }

    else if (type === "large") {

        filteredTemples = temples.filter((temple) => {

            return temple.area > 90000;
        });
    }

    else if (type === "small") {

        filteredTemples = temples.filter((temple) => {

            return temple.area < 10000;
        });
    }

    displayTemples(filteredTemples);
}


// Home
document.querySelector("#home").addEventListener("click", (event) => {

    event.preventDefault();

    filterTemples("home");
});


// Old
document.querySelector("#old").addEventListener("click", (event) => {

    event.preventDefault();

    filterTemples("old");
});


// New
document.querySelector("#new").addEventListener("click", (event) => {

    event.preventDefault();

    filterTemples("new");
});


// Large
document.querySelector("#large").addEventListener("click", (event) => {

    event.preventDefault();

    filterTemples("large");
});


// Small
document.querySelector("#small").addEventListener("click", (event) => {

    event.preventDefault();

    filterTemples("small");
});


// Current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// Last modified
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;


// Mobile menu
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


// Display all temples when the page loads
displayTemples(temples);