<template>
  <div class="shop-wrapper">
    <nav class="navbar navbar-expand-lg sticky-top custom-nav">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="@/assets/Logo_Beanmerce.png" class="logo-img" />
          <span class="brand-name">BEANMERCE</span>
        </a>


        <div class="nav-actions d-flex align-items-center gap-3 ">  <!-- NEW  Change-->
          
          
          
        
          <router-link
          v-if="user"
          to="/perfil"
          class="user-info d-flex align-items-center gap-2 text-decoration-none">
          


          <i class="bi bi-gear-fill user-icon"></i>
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

           <!-- <div v-for="item in cart" :key="item._id" class="cart-item-minimal d-flex align-items-center mb-4 pb-3 border-bottom">   -->

        













<div 
  v-for="item in cart" 
  :key="item._id" 
  class="cart-item-minimal d-flex align-items-center mb-4 pb-3 border-bottom"
>
  <div class="flex-grow-1">
    <h6 class="mb-1 fw-bold small text-uppercase" style="letter-spacing: 1px;">
      {{ item.name }}
    </h6>

    <div class="d-flex align-items-center gap-2">
      <button 
        class="btn btn-sm btn-outline-secondary"
        @click="decreaseQuantity(item._id)"
      >−</button>

      <span class="small">{{ item.quantity }}</span>

      <button 
        class="btn btn-sm btn-outline-secondary"
        @click="item.quantity++"
      >+</button>
    </div>

    <p class="mb-0 small text-muted mt-1">
      ${{ item.price }} c/u
    </p>
  </div>

  <div class="text-end">
    <div class="fw-bold text-brown mb-2">
      ${{ item.price * item.quantity }}
    </div>

    <button 
      class="btn btn-sm btn-outline-danger"
      @click="removeFromCart(item._id)"
    >
      <i class="bi bi-trash"></i>
    </button>
  </div>
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
 
</template>



<script setup lang="ts">

import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import { getProductsRequest } from '@/services/product.service'




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






//NEW 

watch(user, newUser => {
  if (!newUser) {
    cart.value = []
    return
  }

  const CART_KEY = `cart_${newUser._id}`
  cart.value = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
})















onMounted(async () => {
  try {
    const { data } = await getProductsRequest()
    products.value = data
  } catch (error) {
    console.error("Error cargando productos:", error)
  }
})

//ADD
const addToCart = (product: any) => {
  const existing = cart.value.find(p => p._id === product._id)
  existing ? existing.quantity++ : cart.value.push({ ...product, quantity: 1 
  

  })

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





//RESTAR

const decreaseQuantity = (productId: string) => {
  const item = cart.value.find(i => i._id === productId)

  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  }else{
    cart.value = cart.value.filter(i => i._id !== productId)
  }
}



 // IN THIS PART WE HAVE THE REMOVE CART
 
 const removeFromCart =(productId: string) => {
  cart.value = cart.value.filter(item => item._id !==productId)
 
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





















<style scoped


src="/src/styles/Shop.css"

>
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