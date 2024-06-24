import { defineStore } from "pinia";
import { ref } from "vue";

export const useDocumentStore = defineStore("documentStore", () => {
  const documents = ref([]);

  const addDocument = (document) => {
    documents.value.push({ ...document, pinned: false });
  };

  const editDocument = (document) => {
    const index = documents.value.findIndex((doc) => doc.id === document.id);
    if (index !== -1) {
      documents.value[index] = { ...document };
    }
  };

  const deleteDocument = (id) => {
    documents.value = documents.value.filter((doc) => doc.id !== id);
  };

  const togglePin = (document) => {
    const doc = documents.value.find((doc) => doc.id === document.id);
    if (doc) {
      doc.pinned = !doc.pinned;
    }
  };

  return {
    documents,
    addDocument,
    editDocument,
    deleteDocument,
    togglePin,
  };
});
