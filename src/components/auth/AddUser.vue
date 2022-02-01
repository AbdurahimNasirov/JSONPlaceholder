<template>
  <div id="app" class="absolute">
    <v-app id="inspire">
      <v-row justify="center" class="amber darken-4 absolute">
        <v-tooltip top color="indigo">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              fab
              color="indigo"
              class="add-btn-user"
              v-bind="attrs"
              v-on="on"
              @click.stop="showDialog = true"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add new user</span>
        </v-tooltip>

        <v-dialog v-model="showDialog" max-width="500">
          <v-card class="px-5">
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

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text @click="clear"> Cencel </v-btn>

                <v-btn color="green darken-1" text @click="submit">
                  Add New User
                </v-btn>
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
export default {
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
    name: "",
    email: "",
    checkbox: false,
    showDialog: false,
  }),
  mounted() {},
  methods: {
    ...mapActions(["addUser"]),
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        console.log("false");
        return;
      } else {
        this.showDialog = false;
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
          return new Error('Не удалось добавить пользователя')
        }
      }
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.checkbox = false;
      this.showDialog = false;
    },
  },
};
</script>

<style>
.none {
  display: none !important;
}
.absolute {
  position: absolute !important;
}
.add-btn-user {
  position: fixed !important;
  bottom: 3%;
  left: 18%;
}
</style>