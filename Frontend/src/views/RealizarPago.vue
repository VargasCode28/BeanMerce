
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






















<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Montserrat:wght@700&display=swap');

.checkout-wrapper {
  background-color: #fcfcfc;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.checkout-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  letter-spacing: -1px;
}

/* Tarjetas */
.payment-card, .summary-card {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
}

.summary-card {
  background: #fdfaf8; /* Un tono café muy sutil para diferenciar el resumen */
  border: none;
}

/* Selector de Método */
.method-option {
  flex: 1;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.method-option.active {
  border-color: #342318;
  background: #fdfaf8;
  color: #342318;
}

/* Inputs */
.label-minimal {
  font-size: 0.7rem;
  font-weight: 800;
  color: #aaa;
  letter-spacing: 1px;
  margin-bottom: 8px;
  display: block;
}

.input-minimal {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #eee;
  background-color: #fdfdfd;
  font-size: 0.95rem;
  outline: none;
  transition: 0.3s;
}

.input-minimal:focus {
  border-color: #342318;
  background: white;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}

/* Botón de Pago */
.btn-pay-now {
  width: 100%;
  background: #342318;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-pay-now:hover {
  background: #5a3e2b;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(52, 35, 24, 0.2);
}

/* Resumen del pedido */
.order-item {
  border-bottom: 1px solid #eee !important;
}

.item-qty {
  background: #342318;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.text-coffee {
  color: #A67B5B;
}

/* Animaciones */
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
.animate-slide-up { animation: slideUp 0.8s ease-out both; }
.animate-slide-up-delayed { animation: slideUp 0.8s ease-out 0.2s both; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}

/* Transición suave entre métodos */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

