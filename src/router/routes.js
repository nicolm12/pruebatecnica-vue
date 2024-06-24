import DocumentForm from "pages/DocumentForm.vue";
import DocumentGrid from "pages/DocumentGrid.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: DocumentForm }, // Formulario como página principal
      { path: "grid", component: DocumentGrid },
    ],
  },
];

export default routes;
