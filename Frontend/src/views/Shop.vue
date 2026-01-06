<template>
  <div class="shop-wrapper">
    <nav class="navbar navbar-expand-lg sticky-top custom-nav">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="@/assets/Logo_Beanmerce.png" class="logo-img" />
          <span class="brand-name">BEANMERCE</span>
        </a>


        <div class="nav-actions d-flex align-items-center gap-3 ">  <!-- NEW  Change-->
          
          
          
          


        <!-- USER PROFILE           NEW CHANGE-->
        <!-- <div   v-if="user" class="user-info d-flex-items-center gap-2">
          <i class="bi bi-person-circle user-icon"></i>
          <span class="user-email">{{ user.email }}</span> -->



          <router-link
          v-if="user"
          to="/perfil"
          class="user-info d-flex align-items-center gap-2 text-decoration-none">
          


          <i class="bi bi-person-circle user-icon"></i>
          <span class="user-email">{{ user.name }}</span>
        


          </router-link>
          
          
          <button 
            class="cart-trigger" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#cartOffcanvas"
          >
            <i class="bi bi-bag"></i>
            <span v-if="cart.length" class="cart-dot">{{ cart.reduce((a, i) => a + i.quantity, 0) }}</span>
          </button>
          <button @click="logout" class="logout-link">SALIR</button>
        </div>
      </div>
    </nav>

<section class="about-section py-5 mt-4">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 order-2 order-lg-1">
            <div class="about-text-wrapper">
              <span class="about-badge">NUESTRA HISTORIA</span>
              <h2 class="about-title mt-3">Pasión por el grano perfecto</h2>
              <p class="about-description">
                Beanmerce nació de una búsqueda incansable por los perfiles de sabor más puros de Latinoamérica. No solo vendemos café; seleccionamos cosechas de altura y las tostamos cuidadosamente para preservar cada nota de cata.
              </p>
              <div class="row mt-4 g-3">
                <div class="col-6">
                  <div class="feature-item">
                    <i class="bi bi-award"></i>
                    <h6>Calidad Origen</h6>
                  </div>
                </div>
                <div class="col-6">
                  <div class="feature-item">
                    <i class="bi bi-fire"></i>
                    <h6>Tueste Diario</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2">
            <div class="about-image-stack">
              <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070" class="img-fluid rounded-4 shadow-lg main-about-img" alt="Tostado de café" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container text-center mt-5 mb-2">
      <hr class="minimal-divider mx-auto" />
    </div>


    <header class="hero-minimal">
      <div class="container">
        <h1 class="hero-title">Colección de Origen</h1>
        <p class="hero-subtitle">Granos seleccionados y tostados en lotes pequeños.</p>
      </div>
    </header>

    <main class="container py-5">
      <div class="row g-5">
        <div v-for="product in products" :key="product._id" class="col-12 col-sm-6 col-lg-3">
          <div class="product-item">
            <div class="product-image-container">
              <img 
                :src="product.image ? `http://localhost:3000${product.image}` : 'https://via.placeholder.com/400'" 
                class="product-img"
              />
              <div class="product-action-overlay">
                <button @click="addToCart(product)" class="btn-add">AÑADIR AL CARRITO</button>
              </div>
            </div>
            
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer-clean">
      <div class="container text-center">
        <p class="footer-brand">BEANMERCE</p>
        <p class="footer-copy">© 2025 Calidad Premium Garantizada.</p>
      </div>
    </footer>

    <div class="offcanvas offcanvas-end border-0 shadow" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div class="offcanvas-header border-bottom p-4">
        <h5 class="offcanvas-title fw-bold" id="cartOffcanvasLabel" style="letter-spacing: 2px;">TU CARRITO</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body p-4 d-flex flex-column">
        <div v-if="!cart.length" class="text-center py-5 mt-5">
          <i class="bi bi-bag-x fs-1 text-muted opacity-25"></i>
          <p class="mt-3 text-muted">Tu carrito está vacío</p>
        </div>



        <div class="cart-items-list">
          <div v-for="item in cart" :key="item._id" class="cart-item-minimal d-flex align-items-center mb-4 pb-3 border-bottom">
            <div class="flex-grow-1">
              <h6 class="mb-1 fw-bold small text-uppercase" style="letter-spacing: 1px;">{{ item.name }}</h6>
              <p class="mb-0 small text-muted">{{ item.quantity }} x ${{ item.price }}</p>
            </div>
            <div class="fw-bold text-brown">
              ${{ item.price * item.quantity }}
            </div>
          </div>
        </div>


        <div v-if="cart.length" class="mt-auto">
          <div class="d-flex justify-content-between align-items-center mb-4 pt-3">
            <span class="text-muted fw-light">TOTAL</span>
            <span class="fs-4 fw-bold text-brown">${{ total }}</span>
          </div>
          <button @click="goToPayment" class="btn-checkout-minimal">
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup lang="ts">

import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import { getProductsRequest } from '@/services/product.service'
import { checkoutRequest } from '@/services/order.service'
import { routerKey } from 'vue-router'



const products = ref<any[]>([])
const cart = ref<any[]>([])

const user =  ref<any>(null)  //NEW 






  onMounted(() => {        //NEW 

    const storeUser = localStorage.getItem('user')
    if(storeUser) {
      user.value = JSON.parse(storeUser)
    }
  })





const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user?._id || null
}





const loadCart = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userId = user?._id || 'guest'
  const CART_KEY = `cart_${userId}`

  cart.value = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
}

onMounted(() => {
  loadCart()
})



watch(cart, c => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userId = user?._id || 'guest'
  const CART_KEY = `cart_${userId}`

  localStorage.setItem(CART_KEY, JSON.stringify(c))
}, { deep: true })




onMounted(async () => {
  try {
    const { data } = await getProductsRequest()
    products.value = data
  } catch (error) {
    console.error("Error cargando productos:", error)
  }
})


const addToCart = (product: any) => {
  const existing = cart.value.find(p => p._id === product._id)
  existing ? existing.quantity++ : cart.value.push({ ...product, quantity: 1 })



  
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: 'Añadido al carrito',
    showConfirmButton: false,
    timer: 1500,
    background: '#342318',
    color: '#fff'
  })
}

const total = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)




const goToPayment = () => {
  cleanScroll();
  router.push('/realizar-pago')
}






const logout = () => {   
  
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  router.push('/')
}





const cleanScroll = () => {
  document.body.style.overflow = 'auto';
  document.body.classList.remove('modal-open', 'offcanvas-open');
  const backdrops = document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop');
  backdrops.forEach(el => {
    (el as HTMLElement).style.display = 'none';
    el.remove();
  });
}

onMounted(() => {
  cleanScroll();
  window.scrollTo(0, 0);
})



onUnmounted(() => {
  cleanScroll();
})


</script>






















<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Montserrat:wght@700&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");







 /* NEW CHANGE FOR MI PROFILE*/
.user-info {
  font-size: 0.75rem;
  font-weight: 600;
  color: #555;
}


.user-icon {
  font-size: 1.4rem;
  color: #6F4E37;
}

.user-email {
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
















/* Estilos Sobre Nosotros */
.about-section {
  overflow: hidden;
}

.about-badge {
  font-size: 0.7rem;
  letter-spacing: 3px;
  color: #A67B5B;
  font-weight: 700;
  border-bottom: 2px solid #A67B5B;
  padding-bottom: 5px;
}

.about-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #342318;
}

.about-description {
  color: #666;
  line-height: 1.8;
  font-size: 1rem;
  margin-top: 20px;
}

.feature-item {
  background: #fdfaf8;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.feature-item i {
  color: #6F4E37;
  font-size: 1.5rem;
  display: block;
  margin-bottom: 10px;
}

.feature-item h6 {
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.main-about-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.main-about-img:hover {
  transform: scale(1.02);
}

.minimal-divider {
  width: 50px;
  height: 3px;
  background-color: #f0f0f0;
  border: none;
  opacity: 1;
}

/* Ajustes para móviles */
@media (max-width: 991px) {
  .about-text-wrapper {
    text-align: center;
  }
  .about-badge {
    justify-content: center;
  }
  .main-about-img {
    height: 300px;
    margin-bottom: 30px;
  }
}











/* Reset y Bases */
.shop-wrapper {
  background-color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1a1a1a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.custom-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f0f0f0;
  padding: 1rem 0;
  z-index: 1050;
}

.logo-img {
  height: 40px;
  margin-right: 12px;
}

.brand-name {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 4px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #342318;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-trigger {
  background: none;
  border: none;
  position: relative;
  font-size: 1.5rem;
  color: #342318;
  transition: opacity 0.3s;
}

.cart-trigger:hover { opacity: 0.7; }

.cart-dot {
  position: absolute;
  top: 0;
  right: -8px;
  background: #6F4E37;
  color: white;
  font-size: 0.65rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.logout-link {
  background: none;
  border: none;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #999;
  transition: 0.3s;
}

.logout-link:hover { color: #342318; }

/* Hero */
.hero-minimal {
  padding: 80px 0 40px;
  text-align: center;
}

.hero-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.hero-subtitle {
  color: #888;
  font-weight: 300;
  font-size: 1rem;
}

/* Grid y Cards */
main { flex: 1; }

.product-item {
  transition: transform 0.4s ease;
}

.product-image-container {
  position: relative;
  height: 320px;
  overflow: hidden;
  background-color: #fcfcfc;
  border-radius: 4px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
}

.product-action-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
  opacity: 0;
  transition: 0.4s ease;
}

.product-item:hover .product-action-overlay { opacity: 1; }
.product-item:hover .product-img { transform: scale(1.08); }

.btn-add {
  width: 100%;
  background: #ffffff;
  color: #1a1a1a;
  border: none;
  padding: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.product-info {
  padding-top: 15px;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-price {
  color: #6F4E37;
  font-weight: 500;
  font-size: 1rem;
}

/* Offcanvas Carrito */
.offcanvas { width: 380px !important; }

.cart-item-minimal {
  border-bottom: 1px solid #eee !important;
}

.text-brown { color: #6F4E37; }

.btn-checkout-minimal {
  width: 100%;
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 16px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  transition: background 0.3s;
}

.btn-checkout-minimal:hover { background: #342318; }

/* Footer */
.footer-clean {
  padding: 60px 0;
  border-top: 1px solid #f5f5f5;
  margin-top: 60px;
}

.footer-brand {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.footer-copy {
  font-size: 0.75rem;
  color: #aaa;
}












/*FADE UP PAGE ANIMATION*/



@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {

    opacity: 1;
    transform: translateY(0);
  }

}

main,
.hero-minimal,
.about-section {
  animation: fadeUp 0.6s ease-out;
}




</style>





























































































































<!-- 

<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");


/* Colores y Branding */
.bg-brown { background-color: #6F4E37 !important; }
.text-brown { color: #6F4E37; }
.text-coffee { color: #A67B5B; }

.custom-navbar {
  /* background-color: #3b2b20; */
  background-color: #342318;
}

.nav-logo {
  height: 40px;
  border-radius: 5px;
}

.shop-header {
  height: 300px;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1956');
  background-size: cover;
  background-position: center;
}





.img-container {
  height: 220px; /* Ajusta esta altura a tu gusto */
  overflow: hidden;
  width: 100%;
  background-color: #f8f9fa;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}





/* Cards de productos */
.product-card {
  transition: transform 0.3s ease, shadow 0.3s ease;
  border-radius: 1.5rem;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
}

.btn-coffee-sm {
  background-color: #A67B5B;
  color: white;
  border: none;
  font-weight: 600;
  transition: 0.3s;
}

.btn-coffee-sm:hover {
  background-color: #6F4E37;
  color: white;
}

.btn-coffee {
  background-color: #6F4E37;
  color: white;
  border: none;
}

.btn-coffee:hover {
  background-color: #5a3e2b;
  color: white;
}

/* Animaciones */
.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
















/* Estilos del Footer */
.bg-dark-coffee {
  background-color: #241710; /* Un café casi negro para el fondo del footer */
}

footer .text-coffee {
  color: #A67B5B; /* Color café suave para los títulos */
}

footer a {
  transition: color 0.3s ease;
}

footer a:hover {
  color: #6F4E37 !important; /* Color café fuerte al pasar el mouse */
}

footer .bi {
  color: #A67B5B;
}

/* Espaciado extra para el contenido si el navbar es sticky */
.shop-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* Esto empuja el footer hacia abajo si hay pocos productos */
}

</style> -->