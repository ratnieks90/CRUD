import ui from "./ui";
import {ACTIONS} from "./constants";

document.addEventListener('DOMContentLoaded', () => {
    ui.displayEmployees();
})

ui.table.addEventListener('click', (e) => {
    let currentElement = e.target;
    if(currentElement.dataset.action) {
        switch(currentElement.dataset.action) {
            case ACTIONS.delete:
                console.log('delete')
                break;
            case ACTIONS.edit:
                console.log('edit')
                break;
        }
    }else {
        console.log(currentElement)
    }
})
