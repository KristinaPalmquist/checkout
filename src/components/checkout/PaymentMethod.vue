<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['telephoneNumber']);
const emit = defineEmits(['paymentMethod']);

const telephoneNumber = ref(props.telephoneNumber || '');

const paymentMethod = ref('');
const paymentMethodErrors = ref([]);
const cardNumber = ref('');
const cardHolder = ref('');
const cardExpiration = ref('');
const cardCCV = ref('');

const selectedExpMonth = ref('');
const selectedExpYear = ref('');

const cardNumberError = ref('');
const cardHolderError = ref('');
const cardExpirationError = ref('');
const cardCCVError = ref('');

const formatCardNumber = (event) => {
  let input = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
  if (input.length > 16) {
    input = input.slice(0, 16); // Limit to 16 digits
  }
  cardNumber.value = input.match(/.{1,4}/g)?.join(' ') || ''; // Group by 4 digits and join with space
};

const handleKeyPress = (event) => {
  const charCode = event.charCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault(); // Prevent non-digit characters
  }
};

const validateCardNumber = () => {
  cardNumber.value = cardNumber.value.replace(/\D/g, ''); // Remove all non-digit characters
  cardNumberError.value =
    cardNumber.value.length === 16 ? '' : 'Card number must be 16 digits';
  // emitPaymentMethod();
};

const validateCardHolder = () => {
  cardHolderError.value = cardHolder.value ? '' : 'Card holder is required';
  // emitPaymentMethod();
};

const validateCardExpiration = () => {
  let today = new Date();
  if (selectedExpYear.value == '' || selectedExpMonth.value == '') {
    console.log('0');
    cardExpirationError.value = 'Expiration date is required';
    return;
  }

  if (selectedExpYear.value > today.getFullYear().toString()) {
    cardExpirationError.value = '';
  } else if (selectedExpYear.value === today.getFullYear().toString()) {
    if (selectedExpMonth.value >= (today.getMonth() + 1).toString()) {
      cardExpirationError.value = '';
    } else {
      cardExpirationError.value = 'Card expiration date must be in the future';
      return;
    }
  } else {
    cardExpirationError.value = 'Card expiration date must be in the future';
    return;
  }

  if (selectedExpMonth.value !== '' && selectedExpYear.value !== '') {
    cardExpiration.value = `${selectedExpMonth.value}/${selectedExpYear.value}`;
  }
  if (cardExpirationError.value === '') {
    emitPaymentMethod();
  }
};

const validateCCV = () => {
  let ccv = cardCCV.value;
  cardCCVError.value = ccv.length === 3 ? '' : 'CCV must be 3 digits';
};

const validatePaymentMethod = () => {
  if (paymentMethod === 'card') {
    validateCardNumber();
    validateCardHolder();
    validateCardExpiration();
    validateCCV();
    paymentMethod = ['card', cardNumber, cardHolder, cardExpiration, cardCCV];
    emitPaymentMethod();
  } else if (paymentMethod === 'swish') {
    paymentMethod = ['swish', telephoneNumber];
    emitPaymentMethod();
  } else {
    emitPaymentMethod();
  }

  // emitPaymentMethod();
};

watch([selectedExpMonth, selectedExpYear], () => {
  validateCardExpiration();
});

const emitPaymentMethod = () => {
  validatePaymentMethod();
  emit('paymentMethod', paymentMethod.value);
};

// const handleSubmit = () => {
//   validatePaymentMethod();
// };
</script>

<template>
  <div id="payment-method">
    <div id="payment-method-radio-btns">
      <label class="form-control">
        <input
          type="radio"
          id="invoice"
          name="paymentMethod"
          value="invoice"
          v-model="paymentMethod"
          required
        />
        Invoice</label
      >

      <label class="form-control">
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="card"
          v-model="paymentMethod"
        />
        Card</label
      >
      <div v-if="paymentMethod === 'card'">
        <label for="card-number"
          >Card Number<input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            required
            maxlength="19"
            v-model="cardNumber"
            @input="
              formatCardNumber;
              validateCardNumber;
            "
            @keypress="handleKeyPress"
            @blur="validateCardNumber"
          />
        </label>
        <p class="error" v-if="cardNumberError">{{ cardNumberError }}</p>

        <label for="card-holder"
          >Card Holder<input
            type="text"
            name="card-holder"
            id="card-holder"
            placeholder="Anna Smith"
            v-model="cardHolder"
            @input="validateCardHolder"
            @blur="validateCardHolder"
            required
        /></label>
        <p class="error" v-if="cardHolderError">{{ cardHolderError }}</p>

        <label for="card-expiration"
          >Expiration Date
          <!-- <input type="text" name="card-expiration" id="card-expiration" placeholder="31/01" required maxlength="5" > -->

          <select
            name="expireMM"
            id="expireMM"
            v-model="selectedExpMonth"
            @change="validateCardExpiration()"
          >
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            name="expireYY"
            id="expireYY"
            v-model="selectedExpYear"
            @change="validateCardExpiration()"
          >
            <option value="">Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
          </select>
        </label>
        <p class="error" v-if="cardExpirationError">
          {{ cardExpirationError }}
        </p>

        <label
          >CCV<input
            type="text"
            placeholder="123"
            maxlength="3"
            v-model="cardCCV"
            @keypress="handleKeyPress"
            @input="validateCCV"
            @blur="validateCCV"
            required
        /></label>
        <p class="error" v-if="cardCCVError">{{ cardCCVError }}</p>
      </div>

      <label class="form-control">
        <input
          type="radio"
          id="swish"
          name="paymentMethod"
          value="swish"
          v-model="paymentMethod"
        />
        Swish</label
      >
      <div v-if="paymentMethod === 'swish'">
        <label for="telephoneNumber"
          >Telephone Number<input
            type="tel"
            name="telephoneNumber"
            id="telephoneNumber"
            v-model="telephoneNumber"
            required
        /></label>

        <p
          v-show="paymentMethodErrors.length > 0"
          v-for="(error, index) in paymentMethodErrors"
          :key="index"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#payment-method .form-control {
  display: flex;
  align-items: center;
}
/* #payment-method-radio-btns {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
} */

/* #payment-method-radio-btns div {
  display: flex;
  align-items: center;
} */

/* #payment-method-radio-btns label {
  margin: 0;
} */
</style>
