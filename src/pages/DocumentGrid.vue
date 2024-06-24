<template>
  <q-page class="q-pa-md">
    <q-card-group class="q-mb-md flex flex-row flex-wrap">
      <q-card
        v-for="file in documents"
        :key="file.id"
        class="q-mb-sm custom-card"
        style="width: 250px"
      >
        <div class="q-item-section q-item-section--end">
          <q-checkbox v-model="file.selected" />
        </div>
        <q-img :src="getFilePreview(file)" class="fixed-img">
          <div class="absolute-bottom q-pa-xs q-text-center">
            <div class="file-name">{{ file.nombreArchivo }}</div>
          </div>
        </q-img>

        <q-card-actions>
          <q-btn @click="openEditDialog(file)">Edit</q-btn>
          <q-btn @click="openInfoDialog(file)">Info</q-btn>
          <q-btn
            @click="deleteFile(file)"
            :disable="file.fixed || file.selected"
            color="negative"
            >Delete</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-card-group>

    <!-- Popup para editar el archivo -->
    <q-dialog v-model="showEditDialog">
      <q-card>
        <q-card-section>
          <h4>Edit file: {{ selectedFile.nombreArchivo }}</h4>
          <q-input
            v-model="editedFile.nombreArchivo"
            label="File name"
            outlined
          />
          <q-input
            v-model="editedFile.numeroIdentificacion"
            label="Identificacion document"
            outlined
          />
          <q-input
            v-model="editedFile.cantidadPaginas"
            label="Amount of pages"
            outlined
            type="number"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Save changes " color="primary" @click="saveChanges" />
          <q-btn label="Cancel" color="negative" @click="closeEditDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Popup para mostrar información detallada del archivo -->
    <q-dialog v-model="showInfoDialog">
      <q-card>
        <q-card-section>
          <div>
            <h4>File name: {{ selectedFile.nombreArchivo }}</h4>
            <p>
              Create By: {{ selectedFile.nombre }} {{ selectedFile.apellido }}
            </p>
            <p>
              Identification number: {{ selectedFile.numeroIdentificacion }}
            </p>
            <p>Amount of pages: {{ selectedFile.cantidadPaginas }}</p>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Close" color="primary" @click="closeInfoDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useDocumentStore } from "stores/documentStore";

const { documents, deleteDocument, editDocument } = useDocumentStore();

const showEditDialog = ref(false);
const showInfoDialog = ref(false);
const selectedFile = ref(null);
const editedFile = ref(null);

const getFilePreview = (file) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const extension = file.nombreArchivo.split(".").pop().toLowerCase();

  if (imageExtensions.includes(extension)) {
    return file.archivo
      ? URL.createObjectURL(file.archivo)
      : "https://via.placeholder.com/64?text=Preview";
  }

  switch (extension) {
    case "xls":
    case "xlsx":
    case "csv":
      return "https://cdn-icons-png.flaticon.com/512/8242/8242984.png";
    case "doc":
    case "docx":
      return "https://cdn-icons-png.flaticon.com/512/7035/7035543.png";
    default:
      return "https://www.shutterstock.com/image-vector/img-vector-icon-design-on-260nw-2164648583.jpg";
  }
};

const openEditDialog = (file) => {
  selectedFile.value = file;
  editedFile.value = { ...file }; // Clonamos el objeto para evitar mutaciones directas
  showEditDialog.value = true;
};

const openInfoDialog = (file) => {
  selectedFile.value = file;
  showInfoDialog.value = true;
};

const saveChanges = () => {
  editDocument(editedFile.value);
  closeEditDialog();
};

const closeEditDialog = () => {
  showEditDialog.value = false;
};

const closeInfoDialog = () => {
  showInfoDialog.value = false;
};

const deleteFile = (file) => {
  const index = documents.findIndex((doc) => doc.id === file.id);
  if (index !== -1) {
    documents.splice(index, 1);
  }
  if (selectedFile.value && selectedFile.value.id === file.id) {
    showInfoDialog.value = false;
  }
};
</script>

<style scoped>
.q-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.q-item-section--end {
  margin-left: auto;
}

.q-item-section--avatar q-img {
  width: 64px;
  height: 64px;
}

.q-item-label {
  white-space: nowrap;
}

.q-btn {
  margin-left: 8px; /* Espacio entre los botones */
}

.custom-card {
  margin: 20px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 250px; /* Ancho fijo */
}

.fixed-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.file-name {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
