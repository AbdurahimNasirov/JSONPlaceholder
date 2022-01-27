<template>
  <div 
    id="app" 
    class="absolute"
    :class="{none: !show}"
  >
  <!-- все? ya tak delel no ne polucilsa( -->
  <!-- Я волшебник)))) i yesho takoe yest no post add etu ya sam delayu no esho -->
    <v-app id="inspire">
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="20"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
  // ponyali kak modalnie okno
  // ну вообще лучше бы ты использовал popover из bootsrap
  // но я тебе покажу как можно сделать именно твоим способом
  // потом все равно переделай на поповер
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
  mixins: [validationMixin],
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
    block: false,
    name: "",
    email: "",
    checkbox: false,
  }),
  mounted() {},
  props: ["show"],
  methods: {
    ...mapActions(["addUser"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        console.log("false");
        return;
      } else {
        const reqbody = {
          name: this.name,
          email: this.email,
        };
        try {
            await this.addUser({
                url: this.$http.users,
                method: 'post',
                data: reqbody
            })
        } catch (error) {
            console.log(error)
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.checkbox = false;
    },
  },
};
</script>

<style>
.show {
  display: block;
}
.none {
  display: none !important;
}
.absolute {
  position: absolute !important;
  top: 20%;
  width: 50vw;
  height: 300px;
  border: 4px solid black;
  border-radius: 10px;
  padding: 15px;
  background: white;
  left: 100%;
  overflow: hidden;
}
</style>