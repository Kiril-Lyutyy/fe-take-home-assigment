export const SortAlphabetically = function (a, b) {
    if (a.name?.toLowerCase() > b.name?.toLowerCase() || a.title?.toLowerCase() > b.title?.toLowerCase()) return 1;
    if (a.name?.toLowerCase() < b.name?.toLowerCase() || a.title?.toLowerCase() < b.title?.toLowerCase()) return -1;
    return 0;
};