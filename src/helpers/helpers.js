export const SortAlphabetically = function (a, b) {
    if (a.name > b.name || a.title > b.title) return 1;
    if (a.name < b.name || a.title < b.title) return -1;
    return 0;
};