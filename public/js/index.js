import employeesUi from "./components/employeeUi";

document.addEventListener('DOMContentLoaded', () => {
    employeesUi.init();
})
window.onpopstate = function(event) {
    console.log(window.history.length)
    employeesUi.updateState(window.location.pathname);
};