<template>
  <div id="app" class="absolute">
    <v-app id="inspire">
      <v-row justify="center" class="absolute">
        <v-tooltip top color="cyan">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              fab
              color="cyan"
              class="mx-2 absolute-add-btn-post"
              @click.stop="dialog = true"
            >
              <v-icon dark color="white">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add new post</span>
        </v-tooltip>

        <v-dialog v-model="dialog" max-width="500">
          <v-card class="px-5 pb-1">
            <form>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="`∞`"
                label="Title"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="title"
                :error-messages="nameErrors"
                :counter="`∞`"
                label="Description"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>

              <v-select
                v-model="select"
                :items="items"
                :error-messages="selectErrors"
                label="Item"
                required
                @change="$v.select.$touch()"
                @blur="$v.select.$touch()"
              ></v-select>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Do you agree?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>
            </form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="clear"> clear </v-btn>
              <v-btn class="mr-4 green darken-1" text @click="submit">
                Add New Post
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  validations: {
    name: { required },
    title: { required },
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
    title: "",
    email: "",
    select: null,
    items: [],
    checkbox: false,
    userId: null,
    dialog: false,
  }),

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
        this.getUsers.find((user) =>
          user.name === this.select
            ? (this.userId = user.id)
            : (this.userId = null)
        );
        const bodyReq = {
          userId: this.userId,
          title: this.name,
          body: this.title,
        };
        try {
          await this.addPost({
            url: this.$http.post,
            method: "post",
            data: bodyReq,
          });
          this.clear();
        } catch (error) {}
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.title = "";
      this.select = null;
      this.checkbox = false;
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss">
.absolute-add-btn-post {
  position: fixed !important;
  top: 90%;
  right: 3%;
}
.none {
  display: none !important;
}
</style>