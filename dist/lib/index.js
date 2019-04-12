"use strict";
function initiate() {
    gameDeck.createDeck();
    shuffler(gameDeck, 4);
    makeDiv();
    show();
}
initiate();
window.onload = function () {
    clickHandler = document.addEventListener("click", () => {
        initiate();
    }, false);
};
let remove = () => document.removeEventListener("click", () => initiate(), false);
//# sourceMappingURL=index.js.map