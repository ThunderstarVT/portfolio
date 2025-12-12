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