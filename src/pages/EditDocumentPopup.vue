<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="saveChanges">
          <q-input
            v-model="editedDocument.numeroIdentificacion"
            label="Número de Identificación"
          />
          <q-input v-model="editedDocument.nombre" label="Nombre de Pila" />
          <q-input v-model="editedDocument.apellido" label="Apellido" />
          <q-input
            v-model="editedDocument.nombreArchivo"
            label="Nombre del Archivo"
          />
          <q-input
            v-model="editedDocument.cantidadPaginas"
            label="Cantidad de Páginas"
            type="number"
          />
          <q-btn
            label="Guardar Cambios"
            type="submit"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

import { useDocumentStore } from "stores/documentStore";

const { editDocument } = useDocumentStore();
const show = ref(false);
const editedDocument = ref(null);

const saveChanges = () => {
  if (editedDocument.value) {
    editDocument(editedDocument.value);
    show.value = false;
  }
};
</script>
