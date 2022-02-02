<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      label="Title"
      required
    ></v-text-field>
    <v-text-field
      v-model="body"
      :error-messages="nameErrors"
      label="Description"
      required
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Item"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
    ></v-checkbox>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="clearAllData"> Cencel </v-btn>
      <v-btn class="mr-4 green darken-1" text @click="submit">
        Add New Post
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  computed: {
    ...mapGetters(["getUsers"]),
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },
  validations: {
    name: { required },
    body: { required },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  mixins: [validationMixin],
  data: () => ({
    name: "",
    body: "",
    select: null,
    items: [],
    checkbox: false,
    userId: null,
    dialog: true,
  }),
  mounted() {
    this.items = this.getUsers.map((user) => {
      return user.name;
    });
  },
  methods: {
    ...mapActions(["addPost"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      } else {
        this.dialog = false;
        this.$emit("closeDialog", this.dialog);
        this.getUsers.find((user) =>
          user.name === this.select
            ? (this.userId = user.id)
            : (this.userId = null)
        );
        const bodyReq = {
          userId: this.userId,
          title: this.name,
          body: this.body,
        };
        try {
          await this.addPost({
            url: this.$http.post,
            method: "post",
            data: bodyReq,
          });
          this.clearAllData();
        } catch (error) {}
      }
    },
    clearAllData() {
      this.$v.$reset();
      this.name = "";
      this.title = "";
      this.select = null;
      this.checkbox = false;
      this.dialog = false;
      this.$emit("closeDialog", this.dialog);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>