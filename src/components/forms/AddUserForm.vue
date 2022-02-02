<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="20"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="clearAllDataOrCloseWindow"> Cencel </v-btn>

      <v-btn color="green darken-1" text @click="submit">
        Add New User
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data: () => ({
    name: "",
    email: "",
    checkbox: false,
    showDialog: true,
  }),
  methods: {
    ...mapActions(["addUser"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else {
        this.showDialog = false;
        this.$emit("closeDialog", this.showDialog);
        const reqbody = {
          name: this.name,
          email: this.email,
        };
        try {
          await this.addUser({
            url: this.$http.users,
            method: "post",
            data: reqbody,
          });
        } catch (error) {
          return new Error("Не удалось добавить пользователя");
        }
      }
    },

    clearAllDataOrCloseWindow() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.checkbox = false;
      this.showDialog = false;
      this.$emit("closeDialog", this.showDialog);
    },
  },
};
</script>

<style>
</style>