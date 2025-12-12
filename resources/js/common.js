let isDarkMode = localStorage.getItem("isDarkMode") == 'true';

document.querySelector('link[rel="stylesheet"]').href = isDarkMode == true ? `${root}resources/css/style_dark.css` : `${root}resources/css/style.css`;


function toggleDarkMode() {
    isDarkMode = !isDarkMode;

    localStorage.setItem("isDarkMode", isDarkMode);

    document.querySelector('link[rel="stylesheet"]').href = isDarkMode == true ? `${root}resources/css/style_dark.css` : `${root}resources/css/style.css`;
}


function getShortestColumn(query) {
    const columns = document.querySelectorAll(`${query}>.column`);

    let shortest = columns[0];

    for (const col of columns) {
        if (col.scrollHeight < shortest.scrollHeight) {
            shortest = col;
        }
    }

    return shortest;
}

async function loadImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
    });
}