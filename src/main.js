import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamation, faSquareCheck as fasSquareCheck, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck as farSquareCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(faExclamation, farSquareCheck, fasSquareCheck, faTrashCan, faSearch, faXmark);


createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
