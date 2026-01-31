
<template>
  <div class="checkout-wrapper">
    <div class="container py-5">
      <header class="mb-5 text-center animate-fade-in">
        <h1 class="checkout-title">Finalizar Compra</h1>
        <p class="text-muted">Estás a un paso de disfrutar el mejor café de especialidad.</p>
      </header>
      

      <div class="row g-5">
        <div class="col-lg-7">
          <div class="payment-card animate-slide-up">
            <h5 class="fw-bold mb-4">MÉTODO DE PAGO</h5>

            <div class="method-selector d-flex gap-3 mb-4">
              <label class="method-option" :class="{ active: paymentMethod === 'card' }">
                <input type="radio" v-model="paymentMethod" value="card" class="d-none" />
                <i class="bi bi-credit-card fs-4"></i>
                <span>Tarjeta</span>
              </label>
              <label class="method-option" :class="{ active: paymentMethod === 'paypal' }">
                <input type="radio" v-model="paymentMethod" value="paypal" class="d-none" />
                <i class="bi bi-paypal fs-4"></i>
                <span>PayPal</span>
              </label>
            </div>

            <transition name="fade-slide">
              <div v-if="paymentMethod === 'card'" class="card-form">
                <div class="mb-3">
                  <label class="label-minimal">NÚMERO DE TARJETA</label>
                  <div class="input-with-icon">
                    <i class="bi bi-hash"></i>
                    <input v-model="card.number" class="input-minimal" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="label-minimal">NOMBRE DEL TITULAR</label>
                  <input v-model="card.name" class="input-minimal" placeholder="Nombre completo" />
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="label-minimal">EXPIRACIÓN</label>
                    <input v-model="card.exp" class="input-minimal" placeholder="MM/AA" />
                  </div>
                  <div class="col-md-6">
                    <label class="label-minimal">CVC</label>
                    <input v-model="card.cvc" class="input-minimal" placeholder="123" />
                  </div>
                </div>
              </div>
            </transition>

            <transition name="fade-slide">
              <div v-if="paymentMethod === 'paypal'" class="paypal-form">
                <div class="mb-3">
                  <label class="label-minimal">CORREO DE PAYPAL</label>
                  <input v-model="paypalEmail" type="email" class="input-minimal" placeholder="usuario@ejemplo.com" />
                </div>
                <p class="text-muted small">Al confirmar, serás redirigido para completar el pago de forma segura.</p>
              </div>
            </transition>

            <button @click="confirmPayment" class="btn-pay-now mt-4">
              CONFIRMAR Y PAGAR ${{ total }}
            </button>
            <div class="text-center mt-3">
              <span class="text-muted small"><i class="bi bi-shield-lock me-1"></i> Pago encriptado de 256 bits</span>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="summary-card animate-slide-up-delayed">
            <h5 class="fw-bold mb-4">RESUMEN DEL PEDIDO</h5>
            
            <div class="order-items">
              <div v-for="item in cart" :key="item._id" class="order-item d-flex align-items-center mb-3 pb-3 border-bottom">
                <div class="item-qty me-3">{{ item.quantity }}x</div>
                <div class="item-info flex-grow-1">
                  <h6 class="m-0 fw-bold">{{ item.name }}</h6>
                  <small class="text-muted">Café de especialidad</small>
                </div>
                <div class="item-price fw-bold">${{ item.price * item.quantity }}</div>
              </div>
            </div>

            <div class="summary-totals mt-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal</span>
                <span>${{ total }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Envío</span>
                <span class="text-success fw-bold">GRATIS</span>
              </div>
              <hr class="my-3 opacity-10">
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold fs-5">TOTAL</span>
                <span class="fs-3 fw-bold text-coffee">${{ total }}</span>
              </div>
            </div>

            <div class="promo-box mt-4">
              <input class="input-minimal py-2 text-center" placeholder="Código de descuento" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>






<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import { checkoutRequest } from '@/services/order.service'

const cart = ref<any[]>([])










const loadCart = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userId = user?._id || 'guest'
  const CART_KEY = `cart_${userId}`

  cart.value = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
}

onMounted(() => {
  loadCart()
})









const total = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

const paymentMethod = ref('')
const paypalEmail = ref('')
const card = ref({
  number: '',
  name: '',
  exp: '',
  cvc: ''
})





const confirmPayment = async () => {


  if (!cart.value.length) {
    Swal.fire(
      'Carrito vacío',
      'No hay productos para procesar el pago',
      'warning'
    )
    return
  }


  if (!paymentMethod.value) {
   Swal.fire('Selecciona un método de pago', '', 'warning')

    return
  }

  if (
    paymentMethod.value === 'card' &&
    (!card.value.number ||
      !card.value.name ||
      !card.value.exp ||
      !card.value.cvc)
  ) {
    Swal.fire('Completa los datos de la tarjeta', '', 'warning')
    return
  }

  if (paymentMethod.value === 'paypal' && !paypalEmail.value) {
    Swal.fire('Ingresa tu correo de PayPal', '', 'warning')
    return
  }





  try {
    await checkoutRequest({
      items: cart.value.map(i => ({
        product: i._id,
        quantity: i.quantity,
        price: i.price
      })),
      paymentMethod: paymentMethod.value,
      paymentData:
        paymentMethod.value === 'card'
          ? card.value
          : { email: paypalEmail.value }
    })

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const userId = user?._id || 'guest'
    localStorage.removeItem(`cart_${userId}`)

    Swal.fire('Pago exitoso', 'Gracias por tu compra ☕', 'success')
    router.push('/shop')
  } catch (error) {
    Swal.fire('Error', 'No se pudo procesar el pago', 'error')
  }

}

</script>





















<style scoped

src="/src/styles/Realizarpago.css"

>

</style>