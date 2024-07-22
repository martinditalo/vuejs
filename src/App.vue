<script>
import { getUser, deleteUser } from "./api/crud-api";
import AddModal from "./components/AddModal.vue";
import EditModal from "./components/EditModal.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      userData: [],
      addModalIsActive: false,
      editModalIsActive: false,
      editUserData: [],
      reload: false,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    toggleReload() {
      this.reload = !this.reload;
    },

    toggleAddModal() {
      this.addModalIsActive = !this.addModalIsActive;
    },
    toggleEditModal(data) {
      this.editModalIsActive = !this.editModalIsActive;
      this.editUserData = data;
    },
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id).then((res) => {
            console.log("deleted data", res.data);
            this.toggleReload();
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    },
    getTableData() {
      getUser()
        .then((res) => {
          return (this.userData = res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  components: {
    AddModal: AddModal,
    EditModal: EditModal,
  },
  watch: {
    reload(newData, oldData) {
      if (newData !== oldData) {
        this.getTableData();
      }
    },
  },
};
</script>

<template>
  <!-- pug test -->
  <!-- div.data
  ul
    li(v-for="data in getUser.data" :key="data.id") {{ data.name }}
     -->
  <!-- pug end -->
  <div class="container">
    <AddModal
      :addModalIsActive="addModalIsActive"
      @toggle-modal="toggleAddModal"
      @toggle-reload="toggleReload"
    />
    <EditModal
      :editModalIsActive="editModalIsActive"
      @toggle-modal2="toggleEditModal"
      @toggle-reload="toggleReload"
      :editUserData="editUserData"
    />

    <h1>Crud App</h1>
    <Button
      severity="info"
      style="width: 100%; margin-top: 2%"
      @click="toggleAddModal"
      >Add Data</Button
    >

    <DataTable
      class="table"
      :value="userData"
      tableStyle=""
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`${slotProps.data.avatar}`"
            :alt="slotProps.avatar"
            class="img rounded"
          />
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="country" header="Country"></Column>

      <Column header="Actions">
        <template #body="slotProps">
          <Button @click="toggleEditModal(slotProps.data)">Edit</Button>
          <Button
            class="ml-1"
            @click="handleDelete(slotProps.data.id)"
            severity="danger"
            >Delete</Button
          >
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  overflow: auto;
  margin-top: 5%;
}
.container {
  display: flex;
  width: 1000px;
  height: 700px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.img {
  border-radius: 50%;
  height: 45px;
  width: 45px;
}
</style>
