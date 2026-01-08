<template>
  <div class="profile-page">
    <div class="profile-container py-4 animate-fade-in">
      
      <header class="text-center mb-5">
        <div class="avatar-circle mb-3">
          {{ user.name?.charAt(0).toUpperCase() || 'U' }}
        </div>
        <h1 class="display-6 fw-bold">Mi Perfil</h1>
        <p class="text-muted small ls-1">GESTIÓN DE CUENTA BEANMERCE</p>
      </header>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="profile-card h-100">
            <div class="card-icon"><i class="bi bi-person"></i></div>
            <h5 class="fw-bold mb-4">Datos de Usuario</h5>
            
          
            
            <div class="info-item">
              <label>EMAIL</label>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="profile-card h-100">
            <div class="card-icon"><i class="bi bi-shield-lock"></i></div>
            <h5 class="fw-bold mb-4">Seguridad</h5>
            
            <label class="label-minimal">CAMBIAR CONTRASEÑA</label>
            <input 
              v-model="password" 
              type="password" 
              class="minimal-input mb-3" 
              placeholder="Nueva contraseña"
            >
            <button @click="changePassword" class="btn-update-premium w-100">
              ACTUALIZAR
            </button>
          </div>
        </div>

        <div class="col-12">
          <div class="danger-zone-card mt-3">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div>
                <h6 class="text-danger fw-bold mb-1">Zona peligrosa</h6>
                <p class="text-muted small m-0">Borrar tu cuenta es una acción permanente.</p>
              </div>
              <button @click="deleteAccount" class="btn-delete-account">
                ELIMINAR CUENTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import { deleteAccountRequest } from '@/services/user.service'



const user = ref<any>({})
const password = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/')
    return
  }
  user.value = JSON.parse(storedUser)
})

const changePassword = async () => {
  if (!password.value) {
    Swal.fire('Ingresa una contraseña', '', 'warning')
    return
  }
  Swal.fire('Contraseña actualizada', '', 'success')
  password.value = ''
}

const deleteAccount = async () => {
  const result = await Swal.fire({
    title: '¿Eliminar cuenta?',
    text: 'Esta acción es permanente',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#b00020',
    confirmButtonText: 'Sí, eliminar cuenta',
    cancelButtonText: 'Cancelar'
  })

  if (!result.isConfirmed) return

  try {
    await deleteAccountRequest()
    localStorage.clear()
    Swal.fire('Cuenta eliminada', 'Esperamos verte de nuevo ☕', 'success')
    router.push('/')
  } catch (error) {
    Swal.fire('Error', 'No se pudo eliminar la cuenta', 'error')
  }
}
</script>



<style scoped

src="/src/styles/Perfil.css"

>

</style>