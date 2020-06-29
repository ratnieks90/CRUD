class Loader {
    constructor() {
        this.loader = null;
        this.init();
    }

    init() {
        this.loader = document.createElement('div');
        this.loader.classList.add('loader-block');
        this.loader.innerHTML = `<div class="spinner"></div>`;
        const body = document.querySelector('body');
        body.appendChild(this.loader);
    }

    showLoader() {
        this.loader.classList.add('active');
    }

    hideLoader() {
        this.loader.classList.remove('active');
    }

}

export default new Loader();