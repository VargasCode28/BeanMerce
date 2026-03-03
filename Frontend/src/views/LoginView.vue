
<template>
  <div class="auth-container d-flex align-items-center justify-content-center">
    <div class="card auth-card shadow-lg border-0 animate-in">
      <div class="card-body p-5">
        
        <div class="text-center mb-4">
          <img src="@/assets/Logo_Beanmerce.png" alt="Beanmerce Logo" class="brand-logo mb-2">
          <h2 class="fw-bold text-brown">Bienvenido</h2>
          <p class="text-muted">Tu café favorito a un click</p>
        </div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label fw-semibold">Correo Electrónico</label>
            <input 
              type="email" 
              class="form-control form-control-lg custom-input" 
              v-model="email" 
              placeholder="ejemplo@correo.com"
              required 
            />
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Contraseña</label>
            <input 
              type="password" 
              class="form-control form-control-lg custom-input" 
              v-model="password" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" class="btn btn-coffee btn-lg w-100 mb-3 shadow-sm">
            Iniciar Sesión
          </button>
        </form>

        <div class="text-center">
          <p class="mb-0">¿No tienes cuenta?</p>
          <button @click="goToRegister" class="btn btn-link text-coffee fw-bold text-decoration-none">
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue'
import { loginRequest } from '@/services/auth.service';
import router from '@/router';
import Swal from 'sweetalert2';  //NEW IMPORT

const email = ref('')
const password = ref('')

const isLoading = ref(false)   //NEW




const Toast = Swal.mixin({   //NEW
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






const login = async () => {
  try {
    const { data } = await loginRequest(email.value, password.value)
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.user.role)
    localStorage.setItem('user', JSON.stringify(data.user))


  
  //ALERT 
  await Toast.fire({
    icon: 'success',
    title: '¡Bienvenido de nuevo!'
  });


    if (data.user.role === 'admin') {
      router.push('/dashboard')
    } else {
      router.push('/shop')
    }
  } catch (error) {

    Swal.fire({
      title: 'Error de acceso',
      text: 'Credenciales incorrectas. Por favor verifica tu correo y contraseña.',
      icon: 'error',
      confirmButtonColor: '#6F4E37',
      background: '#fff',

      customClass: {
        title: 'text-brown'
      }
    });
  }finally {
    isLoading.value = false;
  }
}

const goToRegister = () => router.push('/register')
</script>



<style scoped


src="/src/styles/Login.css"

>

</style>