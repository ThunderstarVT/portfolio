let root = './';

main();

async function main() {
    const jsonPath = `./projects.json`;

    const response = await fetch(jsonPath)

    if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

    const data = await response.json();

    for (let i = 0; i < 3 && i < data["Featured"].length; i++) {
        const project_jsonPath = `./games/${data["Featured"][i]}.json`;

        const project_response = await fetch(project_jsonPath);

        if (!response.ok) console.error(new Error(`Failed to load ${project_jsonPath}`));

        const project_data = await project_response.json();

        document.querySelector("#featured").innerHTML += `
            <div>
                <a href="./games/?game=${data["Featured"][i]}">
                    <img src="./resources/images/${project_data["Thumbnail"]}.webp" alt="">
                    <span>${project_data["Title"]}</span>
                </a>
            </div>
        `;
    }

    // doesn't change column count on resize, but eh
    for (let i = 0; i < (document.body.offsetWidth/256); i++) {
        document.querySelector("#project-list").innerHTML += `<div class="column"></div>`;
    }

    for (const project of data["All"]) {
        const project_jsonPath = `./games/${project}.json`;

        const project_response = await fetch(project_jsonPath);

        if (!response.ok) console.error(new Error(`Failed to load ${project_jsonPath}`));

        const project_data = await project_response.json();

        await loadImage(`./resources/images/${project_data["Thumbnail"]}.webp`);

        getShortestColumn("#project-list").innerHTML += `
            <div>
                <a href="./games/?game=${project}">
                    <img src="./resources/images/${project_data["Thumbnail"]}.webp" alt="">
                    <span>${project_data["Title"]}</span>
                </a>
            </div>
        `;
    }
}