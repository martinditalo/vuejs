<script>
import { addUser } from "../api/crud-api";
import Swal from "sweetalert2";

export default {
  props: ["addModalIsActive"],
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    toggleModal() {
      this.$emit("toggle-modal");
    },
    toggleReload() {
      this.$emit("toggle-reload");
    },
    handleSubmit() {
      const postData = {
        name: this.firstName + " " + this.lastName,
      };
      addUser(postData)
        .then((res) => {
          this.$emit("post-created", res.data);
          this.firstName = "";
          this.lastName = "";
          console.log("Data Created Successfully", res.data);
          Swal.fire({
            title: "Success",
            text: "Data Created Successfully?",
            icon: "success",
          });
          this.$emit("toggle-modal", !this.addModalIsActive);
          this.toggleReload();
        })
        .catch((error) => {
          console.error("Error creating post:", error);
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
      :visible="this.addModalIsActive"
      header="Add Profile"
      :style="{ width: '25rem' }"
      class="p-2 align-items-center"
    >
      <div class="align-items-center justify-content-around flex mb-4 gap-5">
        <label for="username" class="font-semibold w-24">First Name</label>
        <InputText
          id="firstname"
          v-model="firstName"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="align-items-center justify-content-around flex mb-4 gap-5">
        <label for="username" class="font-semibold w-24">Last Name</label>
        <InputText
          id="lastname"
          v-model="lastName"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex justify-content-center">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="toggleModal"
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
</template>
