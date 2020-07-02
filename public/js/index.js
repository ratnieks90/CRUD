import employeesUi from './components/employeeUi';

//init app
document.addEventListener('DOMContentLoaded', () => {
    employeesUi.init();
})
//update app state when user navigate with browser back and forward buttons
window.onpopstate = function(event) {
    employeesUi.updateState(window.location.pathname);
};