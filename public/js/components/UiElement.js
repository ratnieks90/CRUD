export default class UiElement {
    static button(text, className, clickEvent){
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = text;
        button.addEventListener('click', clickEvent);
        return button;
    }
}