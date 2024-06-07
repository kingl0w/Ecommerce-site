<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in cart.items" v-bind:key="item.product.id">
              <td>{{ item.product.name }}</td>
              <td>${{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ getItemTotal(item).toFixed(2) }}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>${{ cartTotalPrice.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="column is-12 box">
        <h2 class="subtitle">Shipping Information</h2>

        <p class="has-text-grey mb-4">* All fields are required</p>

        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label>First Name*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="first_name"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div class="field">
              <label>Last Name*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="last_name"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="field">
              <label>E-Mail*</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  v-model="email"
                  placeholder="E-Mail"
                />
              </div>
            </div>
            <div class="field">
              <label>Phone*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="phone"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>

          <div class="column is-6">
            <div class="field">
              <label>Address*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="address"
                  placeholder="Address"
                />
              </div>
            </div>
            <div class="field">
              <label>Address Line 2</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="addressLine2"
                  placeholder="Address Line 2"
                />
              </div>
            </div>
            <div class="field">
              <label>City*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="city"
                  placeholder="City"
                />
              </div>
            </div>
            <div class="field">
              <label>State*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="state"
                  placeholder="State Initials (e.g., CA)"
                  maxlength="2"
                />
              </div>
            </div>
            <div class="field">
              <label>Zipcode*</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  v-model="zipcode"
                  placeholder="Zipcode"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <hr />

        <div id="card-element" class="mb-5"></div>

        <template v-if="cartTotalLength">
          <hr />

          <button class="button is-dark" @click="submitForm">
            Pay with Stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Checkout | KONLY Apparel";

    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];

      if (this.first_name === "") {
        this.errors.push("The first name field is required.");
      }

      if (this.last_name === "") {
        this.errors.push("The last name field is required.");
      }

      if (this.email === "") {
        this.errors.push("The email field is required.");
      }

      if (this.phone === "") {
        this.errors.push("The phone field is required.");
      }

      if (this.address === "") {
        this.errors.push("The address field is required.");
      }

      if (this.city === "") {
        this.errors.push("The city field is required.");
      }

      if (this.state === "") {
        this.errors.push("The state field is required.");
      }

      if (this.zipcode === "") {
        this.errors.push("The zipcode field is required.");
      }
    },
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>
