
<template>
  <div class="auth-container d-flex align-items-center justify-content-center">
    <div class="card auth-card shadow-lg border-0 animate-in">
      <div class="card-body p-5">
        
        <div class="text-center mb-4">
          <img src="@/assets/Logo_Beanmerce.png" alt="Beanmerce Logo" class="brand-logo mb-2">
          <h2 class="fw-bold text-brown">Crea tu Cuenta</h2>
          <p class="text-muted">Únete a la experiencia Beanmerce</p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              class="form-control form-control-lg custom-input" 
              v-model="email" 
              placeholder="nombre@ejemplo.com"
              required 
              :disabled="isLoading"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label fw-semibold">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              class="form-control form-control-lg custom-input" 
              v-model="password" 
              placeholder="Mínimo 6 caracteres"
              required 
              :disabled="isLoading"
            />
          </div>

          <button type="submit" :disabled="isLoading" class="btn btn-coffee btn-lg w-100 mb-3 shadow-sm">
            <span v-if="!isLoading">Registrarse</span>
            <div v-else class="spinner-border spinner-border-sm" role="status"></div>
          </button>
        </form>

        <div class="text-center">
          <p class="mb-0">¿Ya tienes una cuenta?</p>
          <button @click="goToLogin" :disabled="isLoading" class="btn btn-link text-coffee fw-bold text-decoration-none">
            Inicia Sesión aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { registerRequest } from '@/services/auth.service';
import router from '@/router';
import Swal from 'sweetalert2';   //NEW




const email = ref('')
const password = ref('')
const isLoading = ref(false)




const Toast = Swal.mixin({  //NEW
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  iconColor: '#6F4E37',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});





const handleRegister = async () => {
  if (isLoading.value) return;
  isLoading.value = true;






  try {
    const { data } = await registerRequest(email.value, password.value);
    console.log('Registro correcto:', data);
  
    await Toast.fire({
      icon: 'success',
      title: '¡Cuenta creada con exito!',
      text: 'Ya puedes iniciar sesion.'
    });




    router.push('/'); 
  } catch (error: any) {
    console.error('Error de registro:', error);
    const errorMessage = error.response?.data?.message || 'Error al crear la cuenta. Intenta de nuevo.';
   
   
   

  
  Swal.fire({
    title: 'Cuenta ya existente',
    icon: 'error',
    confirmButtonColor: '#6F4E37',
    background: '#ffffff',
    customClass: {
      title: 'text-brown'
    }
  });

  } finally {
    isLoading.value = false;
  }
}





const goToLogin = () => {
  router.push('/'); 
}
</script>







<style scoped>


.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform:  translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}





/* Estilos idénticos al Login para mantener la marca */
.auth-container {
  min-height: 100vh;
  /* Fondo con imagen de café y overlay oscuro */
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070') no-repeat center center;
  background-size: cover;
  padding: 20px;
}

.auth-card {
  max-width: 450px;
  width: 100%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.98); /* Blanco casi opaco */
}

.brand-logo {
  max-width: 120px;
  border-radius: 12px;
}

.text-brown {
  color: #6F4E37; /* El café de tu logo */
}

.text-coffee {
  color: #A67B5B;
}

.custom-input:focus {
  border-color: #6F4E37;
  box-shadow: 0 0 0 0.25rem rgba(111, 78, 55, 0.25);
}

.btn-coffee {
  background-color: #6F4E37;
  color: white;
  border: none;
  transition: all 0.3s ease;
}

.btn-coffee:hover {
  background-color: #5a3e2b;
  transform: translateY(-2px);
}

.btn-coffee:disabled {
  background-color: #8d7361;
}

@media (max-width: 576px) {
  .auth-card {
    margin: 10px;
  }
  .card-body {
    padding: 2rem !important;
  }
}
</style>