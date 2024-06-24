import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();

const app = createApp(App);

app.use(Quasar, quasarUserOptions);
app.use(router);
app.use(pinia);
