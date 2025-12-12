main();

async function main() {
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get("game");

    if (!gameParam) throw new Error("No game parameter provided in URL");

    const jsonPath = `./${gameParam}.json`;

    const response = await fetch(jsonPath)

    if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

    const data = await response.json();

    // set the title
    document.title = data["Title"];

    // set summary with title
    document.querySelector("#main>.left").innerHTML = `
        <h1>${data["Title"]}</h1>
        <p>${data["Summary"]}</p>
    `;

    // set thumbnail and links
    let linkText = ``;

    for (const [key, value] of Object.entries(data["Links"])) {
        linkText += `
            <li>
                <a href="${value}" target="_blank">${key}</a>
            </li>
        `;
    }

    document.querySelector("#main>.right").innerHTML = `
        <img src="../resources/images/${data["Thumbnail"]}.webp" alt="${data["Thumbnail"]}">
        <p>
            <ul>
                <li>
                    <a href="#gallery">Gallery</a>
                </li>
                ${linkText}
            </ul>
        </p>
    `;

    // set description things
    let descriptionText = ``;

    for (const [key, value] of Object.entries(data["Description"])) {
        descriptionText += `
            <hr>
            <div>
                <h2>${key}</h2>
                <p>${value}</p>
            </div>
        `;
    }

    document.querySelector("#description").innerHTML = descriptionText;

    // set the images in the gallery
    for (let i = 0; i < (document.body.offsetWidth/384); i++) {
        document.querySelector("#gallery").innerHTML += `<div class="column"></div>`;
    }

    for (const name of data["Gallery"]) {
        const src = `../resources/images/${name}.webp`;
        await loadImage(src);
        getShortestColumn("#gallery").innerHTML += `<a href="${src}" target="_blank"><img src="${src}" alt="${name}"></a>`;
    }
}