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
                  v-model="address2"
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
                  v-model="zip_code"
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

        <div id="card-element" class="mb-5 stripe-card"></div>

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
      address2: "",
      city: "",
      state: "",
      zip_code: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Checkout | KONLY Apparel";

    this.cart = this.$store.state.cart;

    if (this.cartTotalLength > 0) {
      this.stripe = window.Stripe(process.env.STRIPE_KEY);
      const elements = this.stripe.elements();
      this.card = elements.create("card", {
        hidePostalCode: true,
        style: {
          base: {
            color: "#ffffff",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      });
      this.card.mount("#card-element");
    }
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

      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);

        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);

            this.errors.push("Something went wrong with the Stripe token.");

            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = this.cart.items.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
      }));

      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        address2: this.address2 || "",
        city: this.city,
        state: this.state,
        zip_code: this.zipcode,
        phone: this.phone,
        items: items,
        stripe_token: token.id,
      };

      await axios
        .post("/api/v1/checkout/", data)
        .then((response) => {
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push("Something went wrong. Please try again.");
          console.log(error);
        });

      this.$store.commit("setIsLoading", false);
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

<style>
.stripe-card .StripeElement {
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transition: box-shadow 150ms ease;
}

.stripe-card .StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.stripe-card .StripeElement--invalid {
  border-color: #fa755a;
}

.stripe-card .StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.stripe-card input {
  color: #ffffff;
}
</style>
