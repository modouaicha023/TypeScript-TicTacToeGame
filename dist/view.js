// type ElementOnjectDictionary = {
//     [Key in string]: Element,
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _View_instances, _View_updateScoreBoar, _View_openModal, _View_closeModal, _View_closeAll, _View_clearMoves, _View_initalizeMove, _View_closeMenu, _View_toggleMenu, _View_handlePlayerMove, _View_setTurnIndicator, _View_qs, _View_qsAll;
class View {
    constructor() {
        _View_instances.add(this);
        this.$ = {};
        this.$$ = {};
        this.$.menu = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='menu']");
        this.$.menuBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='menu-btn']");
        this.$.menuItems = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='menu-items']");
        this.$.resetBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='reset-btn']");
        this.$.newRoundBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='new-round-btn']");
        this.$.modal = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='modal']");
        this.$.modalText = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='modal-text']");
        this.$.modalBtn = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='modal-btn']");
        this.$.turn = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='turn']");
        this.$.p1Wins = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='p1-wins']");
        this.$.p2Wins = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='p2-wins']");
        this.$.ties = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, "[data-id='ties']");
        this.$$.squares = __classPrivateFieldGet(this, _View_instances, "m", _View_qsAll).call(this, "[data-id='square']");
        this.$.menuBtn.addEventListener("click", (event) => {
            __classPrivateFieldGet(this, _View_instances, "m", _View_toggleMenu).call(this);
        });
    }
    render(game, stats) {
        const { playerWithStats, ties } = stats;
        const { moves, currentPlayer, status: { isComplete, winner } } = game;
        __classPrivateFieldGet(this, _View_instances, "m", _View_closeAll).call(this);
        __classPrivateFieldGet(this, _View_instances, "m", _View_clearMoves).call(this);
        __classPrivateFieldGet(this, _View_instances, "m", _View_updateScoreBoar).call(this, playerWithStats[0].wins, playerWithStats[1].wins, ties);
        __classPrivateFieldGet(this, _View_instances, "m", _View_initalizeMove).call(this, moves);
        if (isComplete) {
            __classPrivateFieldGet(this, _View_instances, "m", _View_openModal).call(this, winner ? `${winner.name} wins` : 'Tie');
            return;
        }
        __classPrivateFieldGet(this, _View_instances, "m", _View_setTurnIndicator).call(this, currentPlayer);
    }
    bindGameResetEvent(handler) {
        this.$.resetBtn.addEventListener('click', handler);
        this.$.modalBtn.addEventListener('click', handler);
    }
    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener('click', handler);
    }
    bindPlayerMoveEvent(handler) {
        this.$$.squares.forEach((square) => {
            square.addEventListener('click', (event) => {
                if (square instanceof HTMLElement) {
                    handler(square);
                }
            });
        });
    }
}
_View_instances = new WeakSet(), _View_updateScoreBoar = function _View_updateScoreBoar(p1Wins, p2Wins, ties) {
    this.$.p1Wins.textContent = `${p1Wins} wins`;
    this.$.p2Wins.textContent = `${p2Wins} wins`;
    this.$.ties.textContent = `${ties} wins`;
}, _View_openModal = function _View_openModal(message) {
    this.$.modal.classList.remove('hidden');
    this.$.modalText.textContent = message;
}, _View_closeModal = function _View_closeModal() {
    this.$.modal.classList.add('hidden');
}, _View_closeAll = function _View_closeAll() {
    __classPrivateFieldGet(this, _View_instances, "m", _View_closeModal).call(this);
    __classPrivateFieldGet(this, _View_instances, "m", _View_closeMenu).call(this);
}, _View_clearMoves = function _View_clearMoves() {
    this.$$.squares.forEach(square => {
        square.replaceChildren();
    });
}, _View_initalizeMove = function _View_initalizeMove(moves) {
    this.$$.squares.forEach(square => {
        const existingMove = moves.find(move => move.squareId === +square.id);
        if (existingMove) {
            __classPrivateFieldGet(this, _View_instances, "m", _View_handlePlayerMove).call(this, square, existingMove.player);
        }
    });
}, _View_closeMenu = function _View_closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");
    // const icon = this.$.menuBtn.querySelector('i');
    const icon = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, 'i', this.$.menuBtn);
    icon.classList.add("fa-chevron-down");
    icon.classList.remove("fa-chevron-up");
}, _View_toggleMenu = function _View_toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");
    const icon = __classPrivateFieldGet(this, _View_instances, "m", _View_qs).call(this, 'i', this.$.menuBtn);
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
}, _View_handlePlayerMove = function _View_handlePlayerMove(squareEl, player) {
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
}, _View_setTurnIndicator = function _View_setTurnIndicator(player) {
    const icon = document.createElement('i');
    const label = document.createElement('p');
    icon.classList.add('fa-solid', player.colorClass, player.iconClass);
    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;
    this.$.turn.replaceChildren(icon, label);
}, _View_qs = function _View_qs(selector, parent) {
    // const el = parent?.querySelector(selector)
    const el = parent
        ? parent.querySelector(selector)
        : document.querySelector(selector);
    if (!el)
        throw new Error("Could not find element");
    return el;
}, _View_qsAll = function _View_qsAll(selector) {
    const elList = document.querySelectorAll(selector);
    if (!elList)
        throw new Error("Could not find elements");
    return elList;
};
export default View;
