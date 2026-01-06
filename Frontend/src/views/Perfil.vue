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
            
            <!-- <div class="info-item mb-4">
              <label>NOMBRE</label>
              <p>{{ user.name }}</p>
            </div> -->
            
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

.profile-page {
  background-color: #fafafa;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #222;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.avatar-circle {
  width: 75px;
  height: 75px;
  background: #342318;
  color: #fff;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.8rem;
  font-weight: 800;
  box-shadow: 0 8px 16px rgba(52, 35, 24, 0.15);
}

.profile-card {
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.card-icon {
  font-size: 1.3rem;
  color: #A67B5B;
  margin-bottom: 12px;
}

.info-item label, .label-minimal {
  font-size: 0.65rem;
  font-weight: 800;
  color: #aaa;
  letter-spacing: 1px;
  display: block;
  margin-bottom: 5px;
}

.info-item p {
  font-weight: 700;
  font-size: 1rem;
  margin: 0;
  color: #342318;
}

.minimal-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  background: #fdfdfd;
  transition: 0.3s;
}

.minimal-input:focus {
  border-color: #342318;
  background: #fff;
  outline: none;
}

.btn-update-premium {
  background: #342318;
  color: #fff;
  border: none;
  padding: 13px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  transition: 0.3s;
}

.btn-update-premium:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
}

.danger-zone-card {
  background: #fffafa;
  border: 1px solid #fee2e2;
  border-radius: 20px;
  padding: 24px;
}

.btn-delete-account {
  background: #b00020;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.8rem;
  transition: 0.3s;
}

.btn-delete-account:hover {
  background: #900018;
}

.ls-1 { letter-spacing: 1.5px; }

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>