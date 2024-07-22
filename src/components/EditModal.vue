<script>
import { editUser } from "../api/crud-api";
import Swal from "sweetalert2";

export default {
  props: ["editModalIsActive", "editUserData"],
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },

  methods: {
    splitFullname(num) {
      return this.editUserData.name.split(" ")[num];
    },
    toggleReload() {
      this.$emit("toggle-reload");
    },
    toggleModal2() {
      this.$emit("toggle-modal2");
    },
    handleSubmit() {
      const postData = {
        name:
          (this.firstName === "" ? this.splitFullname(0) : this.firstName) +
          " " +
          (this.lastName === "" ? this.splitFullname(1) : this.lastName),
      };
      console.log(postData);
      editUser(postData, this.editUserData.id)
        .then((res) => {
          this.$emit("put-created", res.data);
          this.firstName = "";
          this.lastName = "";
          console.log("Data Edited Successfully", res.data);
          Swal.fire({
            title: "Success",
            text: "Data Edited Successfully?",
            icon: "success",
          });
          this.$emit("toggle-modal2", !this.editModalIsActive);
          this.toggleReload();
        })
        .catch((error) => {
          console.error("Error creating put:", error);
        });
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Dialog
      :closable="false"
      modal
      :visible="this.editModalIsActive"
      header="Edit Profile"
      :style="{ width: '25rem' }"
      class="p-2 align-items-center"
    >
      <div class="align-items-center justify-content-around flex mb-4 gap-5">
        <label for="firstname" class="font-semibold w-24">First Name</label>
        <InputText
          id="firstname"
          v-model="firstName"
          class="flex-auto"
          autocomplete="off"
          :placeholder="splitFullname(0)"
        />
      </div>
      <div class="align-items-center justify-content-around flex mb-4 gap-5">
        <label for="lastname" class="font-semibold w-24">Last Name</label>
        <InputText
          id="lastname"
          v-model="lastName"
          class="flex-auto"
          autocomplete="off"
          :placeholder="splitFullname(1)"
        />
      </div>
      <div class="flex justify-content-center">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="toggleModal2"
        ></Button>
        <Button
          class="ml-3"
          type="submit"
          label="Save"
          severity="info"
          @click="handleSubmit"
        ></Button>
      </div>
    </Dialog>
  </form>
  <!-- </div> -->
</template>
