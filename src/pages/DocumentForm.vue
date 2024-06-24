<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <q-card class="q-pa-md" style="max-width: 400px; margin: auto">
        <q-card-section>
          <q-form @submit.prevent="addDocument">
            <q-input
              v-model="document.numeroIdentificacion"
              label="Identification document number"
              required
            />
            <q-input v-model="document.nombre" label="First name" required />
            <q-input v-model="document.apellido" label="Last name" required />
            <q-input
              v-model="document.nombreArchivo"
              label="Name of the file"
              required
            />
            <q-input
              v-model="document.cantidadPaginas"
              label="Amount of pages"
              type="number"
              required
            />
            <q-input v-model="document.id" label="ID" :readonly="true" />

            <div class="q-gutter-sm row items-start">
              <q-uploader
                label="File input"
                :url="null"
                @added="handleFileAdded"
                icon="add"
                style="max-width: 300px"
              />
            </div>

            <q-btn
              label="Agregar Documento"
              type="submit"
              color="primary"
              class="q-mt-md"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";
import { useDocumentStore } from "stores/documentStore";

const documentStore = useDocumentStore();
const document = reactive({
  numeroIdentificacion: "",
  nombre: "",
  apellido: "",
  nombreArchivo: "",
  cantidadPaginas: 0,
  id: Math.random().toString(36).substr(2, 10),
  archivo: null,
});

const handleFileAdded = (files) => {
  if (files.length > 0) {
    document.archivo = files[0];
    document.nombreArchivo = files[0].name; // Opcional: Puedes actualizar el nombre del archivo automáticamente
  }
};

const addDocument = () => {
  documentStore.addDocument({ ...document });
  document.id = Math.random().toString(36).substr(2, 10);
  // Resetear el formulario después de agregar el documento
  document.numeroIdentificacion = "";
  document.nombre = "";
  document.apellido = "";
  document.nombreArchivo = "";
  document.cantidadPaginas = 0;
  document.archivo = null;
};
</script>

<style scoped>
.q-card {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ajusta la altura según necesites */
}

.q-form {
  width: 100%; /* Asegura que el formulario ocupe todo el ancho del card */
}
</style>
