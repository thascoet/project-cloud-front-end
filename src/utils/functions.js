(todo) => setTodos((todos) => updateListElement(todos, index)(todo))

const updateListElement = (setter, i) => (x) => setter((l) => {
    l[i] = x;
    return structuredClone(l);
});

const getHexColor = (color) => {
    switch (color) {
        case "yellow":
            return "#ccff00";
        case "green":
            return "#79FE0C";
        case "pink":
            return "#FF70C5";
        case "blue":
            return "#15f4EE";
        default:
            return "#ccff00";
    }
}

export {
    updateListElement,
    getHexColor
};