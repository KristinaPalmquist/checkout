<script setup>
import BillingAddress from '../components/checkout/BillingAddress.vue';
import DeliveryAddress from '../components/checkout/DeliveryAddress.vue';
import UserInfo from '../components/checkout/UserInfo.vue';
import PaymentMethod from '../components/checkout/PaymentMethod.vue';
import { ref } from 'vue';
import BasicButton from '@/components/BasicButton.vue';

const userInfo = ref([]);
const billingAddress = ref([]);
const deliveryAddress = ref([]);
const paymentMethod = ref([]);
const useSameAddress = ref(true);

const showUserInfo = ref(true);
const showBillingAddress = ref(false);
const showDeliveryAddress = ref(false);
const showPaymentMethod = ref(false);
const showOrientationBtns = ref(true);

const error = ref('');

const handleUserInfo = (info) => {
  userInfo.value = info;
};

const handleBillingAddress = (address) => {
  billingAddress.value = address;
  if (useSameAddress.value) {
    deliveryAddress.value = address;
  }
};

const handleSameAdress = () => {
  useSameAddress.value = !useSameAddress.value;
  if (useSameAddress.value) {
    deliveryAddress.value = billingAddress.value;
  } else {
    deliveryAddress.value = [];
  }
};

const handleDeliveryAddress = (address) => {
  deliveryAddress.value = address;
};

const handlePaymentMethod = (method) => {
  paymentMethod.value = method;
};

const validateUserInfo = () => {
  const [firstName, lastName, email, tel] = userInfo.value;
  return firstName && lastName && email && tel;
};

const validateBillingAddress = () => {
  const [street, streetAdditional, zip, city, country] = billingAddress.value;
  return street && streetAdditional && zip && city && country;
};

const validateDeliveryAddress = () => {
  const [street, streetAdditional, zip, city, country] = deliveryAddress.value;
  return street && streetAdditional && zip && city && country;
};

const validatePaymentMethod = () => {
  return paymentMethod.value.length > 0;
};

const previousSection = () => {
  if (showDeliveryAddress.value) {
    showDeliveryAddress.value = false;
    showBillingAddress.value = true;
  } else if (showBillingAddress.value) {
    showBillingAddress.value = false;
    showUserInfo.value = true;
  } else if (showPaymentMethod.value) {
    showPaymentMethod.value = false;
    showDeliveryAddress.value = true;
  }
};

const nextSection = () => {
  if (showUserInfo.value && validateUserInfo()) {
    showUserInfo.value = false;
    showBillingAddress.value = true;
    error.value = '';
  } else {
    error.value = 'Please fill out all fields';
  }
  if (showBillingAddress.value && validateBillingAddress()) {
    showBillingAddress.value = false;
    showDeliveryAddress.value = true;
  } else if (showDeliveryAddress.value) {
    if (useSameAddress.value) {
      showDeliveryAddress.value = false;
      showPaymentMethod.value = true;
    } else if (validateDeliveryAddress()) {
      showDeliveryAddress.value = false;
      showPaymentMethod.value = true;
    }
  }
};

const clearForm = () => {
  userInfo.value = [];
  billingAddress.value = [];
  deliveryAddress.value = [];
  paymentMethod.value = [];
  useSameAddress.value = true;
  showUserInfo.value = true;
  showBillingAddress.value = false;
  showDeliveryAddress.value = false;
  showPaymentMethod.value = false;
  showOrientationBtns.value = true;

  console.log('Form cleared');
};

const emit = defineEmits(['formData']);

const onSubmit = () => {
  if (
    validateUserInfo() &&
    validateBillingAddress() &&
    validateDeliveryAddress() &&
    validatePaymentMethod()
  ) {
    const formData = [userInfo, billingAddress, deliveryAddress, paymentMethod];
    emit('formData', formData);
  } else {
    console.log('Form not completed');
  }
  const formData = [userInfo, billingAddress, deliveryAddress, paymentMethod];
  emit('formData', formData);
  // console.log('Form submitted');
};
</script>

<template>
  <form id="checkout-form" @submit.prevent="onSubmit">
    <h2>Checkout</h2>

    <div class="section-headers-wrapper">
      <h3
        :class="{ active: showUserInfo, inactive: !showUserInfo }"
        class="section-header"
      >
        User
      </h3>
      <h3
        :class="{ active: showBillingAddress, inactive: !showBillingAddress }"
        class="section-header"
      >
        Billing
      </h3>
      <h3
        :class="{ active: showDeliveryAddress, inactive: !showDeliveryAddress }"
        class="section-header"
      >
        Delivery
      </h3>
      <h3
        :class="{ active: showPaymentMethod, inactive: !showPaymentMethod }"
        class="section-header"
      >
        Payment
      </h3>
    </div>

    <UserInfo
      @userInfo="handleUserInfo"
      v-if="showUserInfo"
      :userInfo="userInfo"
    />
    <BillingAddress
      @billingAddress="handleBillingAddress"
      v-if="showBillingAddress"
      :billingAddress="billingAddress"
    />
    <div id="same-address-checkbox" v-if="showDeliveryAddress">
      <div v-if="useSameAddress">
        <input
          type="checkbox"
          name="sameAddress"
          id="sameAddress"
          v-model="useSameAddress"
          @click="handleSameAdress"
        />
        <label for="sameAddress">Use Billing Address as Delivery Address</label>
      </div>

      <DeliveryAddress
        @deliveryAddress="handleDeliveryAddress"
        v-else
        :deliveryAddress="deliveryAddress"
      />
    </div>

    <PaymentMethod
      @paymentMethod="handlePaymentMethod"
      v-if="showPaymentMethod"
      :paymentMethod="paymentMethod"
      :telephoneNumber="userInfo[3]"
    />
    <div class="error" v-if="error">
      <p>{{ error }}</p>
    </div>

    <div
      class="btn-div"
      v-if="showOrientationBtns"
      v-bind:style="showUserInfo ? { position: 'relative' } : ''"
    >
      <BasicButton
        :btnType="button"
        :btnText="'Back'"
        :btnFunction="() => previousSection('billingAddress')"
        v-if="showBillingAddress || showDeliveryAddress"
      />

      <BasicButton
        :btnType="button"
        :btnText="'Next'"
        :btnFunction="nextSection"
        :btnClass="'cta-btn'"
        v-if="showUserInfo || showBillingAddress || showDeliveryAddress"
        v-bind:style="
          showUserInfo
            ? {
                position: 'absolute',
                left: '75%',
                transform: 'translateX(-50%)',
              }
            : ''
        "
      />
    </div>

    <div class="btn-div" v-if="showPaymentMethod">
      <BasicButton :btnText="'Clear form'" :btnFunction="clearForm" />
      <BasicButton
        :btnText="'Submit'"
        :btnFunction="onSubmit"
        :btnClass="'cta-btn'"
      />
    </div>
  </form>
</template>

<style>
#checkout-form {
  width: clamp(300px, 70%, 1000px);
  background-color: #eee;
  padding: 2rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem auto;
  margin-top: 5rem;
  border: 1px solid #ccc;
  color: #000;
}
/* 
#checkout-form div {
  width: 100%;
} */

#checkout-form div:not(.section-headers-wrapper) {
  width: 90%;
}

#checkout-form .section-headers-wrapper {
  border: 1px solid #cbd2d9;
  border-radius: 0.3rem;
  display: inline-flex;
  overflow: hidden;
  margin-bottom: 2rem;
}

#checkout-form .section-header {
  background: #fff;
  color: #333;
  outline: none;
  padding: 0.25em 0.75em 0.25em 1.25em;
  position: relative;
}

#checkout-form .section-header:after,
#checkout-form .section-header:before {
  background: white;
  bottom: 0;
  clip-path: polygon(50% 50%, -50% -50%, 0 100%);
  content: '';
  left: 100%;
  position: absolute;
  top: 0;
  width: 1em;
  z-index: 1;
}

#checkout-form .section-header:before {
  background: #cbd2d9;
  margin-left: 1px;
}

#checkout-form .section-header:last-child {
  border-right: none;
}

#checkout-form .section-header.active,
#checkout-form .section-header.active:after {
  background: #dcf7ba;
  /* background: #edf1f5; */
}

#checkout-form input {
  background-color: #fff;
}
#checkout-form label {
  display: block;
}

#checkout-form input[type='text'],
#checkout-form input[type='email'],
#checkout-form input[type='tel'] {
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

#checkout-form input[type='radio'],
#checkout-form input[type='checkbox'] {
  margin-right: 1rem;
}

#checkout-form #same-address-checkbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (max-width: 1060px) {
  #checkout-form {
    width: 90%;

    padding: 1rem;
  }
}
@media only screen and (max-width: 740px) {
  #checkout-form {
    width: 100%;
  }
}
@media only screen and (max-width: 550px) {
  #checkout-form .section-header {
    font-size: 1rem;
  }
}
@media only screen and (max-width: 400px) {
  #checkout-form .section-header {
    font-size: 0.8rem;
  }
}
</style>
