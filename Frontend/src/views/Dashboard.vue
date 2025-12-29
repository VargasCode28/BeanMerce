<!-- 
<template>
  <div class="admin-layout d-flex">
    <aside class="sidebar bg-brown text-white p-3 d-none d-md-block">
      <div class="text-center mb-5 mt-3">
        <img src="@/assets/Logo_Beanmerce.png" alt="Logo" class="admin-logo mb-2">
        <h5 class="fw-bold">Admin Beanmerce</h5>
      </div>
      <nav class="nav flex-column gap-2">
        <a class="nav-link active" href="#"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
        <a class="nav-link" href="#"><i class="bi bi-box-seam me-2"></i> Inventario</a>
        <a class="nav-link" href="#"><i class="bi bi-people me-2"></i> Usuarios</a>
        <a class="nav-link" href="#"><i class="bi bi-receipt me-2"></i> Órdenes</a>
        <hr class="text-white-50">
        <button @click="logout" class="btn btn-outline-light border-0 text-start">
          <i class="bi bi-box-arrow-left me-2"></i> Salir
        </button>
      </nav>
    </aside>

    <main class="main-content flex-grow-1 p-4">
      <header class="d-flex justify-content-between align-items-center mb-4 animate-in">
        <h2 class="fw-bold text-brown">Gestión General</h2>
        <span class="badge bg-coffee px-3 py-2 rounded-pill">Admin Mode</span>
      </header>

      <section class="row g-3 mb-5 animate-in" style="animation-delay: 0.1s">
        <div class="col-md-4">
          <div class="card stat-card shadow-sm border-0 p-3 bg-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-muted mb-0">Usuarios</h6>
                <h3 class="fw-bold mb-0">{{ users.length }}</h3>
              </div>
              <div class="stat-icon bg-light-brown"><i class="bi bi-people text-brown"></i></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card stat-card shadow-sm border-0 p-3 bg-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-muted mb-0">Órdenes</h6>
                <h3 class="fw-bold mb-0">{{ orders.length }}</h3>
              </div>
              <div class="stat-icon bg-light-brown"><i class="bi bi-cart-check text-brown"></i></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card stat-card shadow-sm border-0 p-3 bg-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="text-muted mb-0">Productos</h6>
                <h3 class="fw-bold mb-0">{{ products.length }}</h3>
              </div>
              <div class="stat-icon bg-light-brown"><i class="bi bi-cup-hot text-brown"></i></div>
            </div>
          </div>
        </div>
      </section>

      <div class="row g-4 animate-in" style="animation-delay: 0.2s">
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm p-4 h-100">
            <h5 class="fw-bold text-brown mb-4">Nuevo Producto</h5>
            <div class="mb-3">
              <label class="form-label small fw-bold">Nombre del Café</label>
              <input v-model="name" class="form-control custom-input" placeholder="Ej: Espresso Intenso" />
            </div>
            <div class="mb-4">
              <label class="form-label small fw-bold">Precio (USD)</label>
              <input v-model.number="price" type="number" class="form-control custom-input" placeholder="0.00" />
            </div>









<div class="mb-4">
  <label class="form-label small fw-bold">Imagen del Producto</label>
  <input
    type="file"
    class="form-control"
    accept="image/*"
    @change="onFileChange"
  />
</div>

<div v-if="imagePreview" class="mb-3 text-center">
  <img
    :src="imagePreview"
    class="img-fluid rounded shadow"
    style="max-height: 150px"
  />
</div>







            <button @click="createProduct" class="btn btn-coffee w-100 py-2">
              <i class="bi bi-plus-lg me-1"></i> Agregar al catálogo
            </button>
          </div>
        </div>



        <div class="col-lg-8">
          <div class="card border-0 shadow-sm p-4 h-100">
            <h5 class="fw-bold text-brown mb-4">Catálogo Actual</h5>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th class="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product._id">
                    <td class="fw-semibold">{{ product.name }}</td>
                    <td class="text-coffee fw-bold">${{ product.price }}</td>
                    <td class="text-end">
                      <button @click="removeProduct(product._id)" class="btn btn-outline-danger btn-sm border-0">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-5 animate-in" style="animation-delay: 0.3s">
        <h5 class="fw-bold text-brown mb-3">Historial de Órdenes</h5>
        <div class="card border-0 shadow-sm">
          <div class="table-responsive">
            <table class="table table-borderless align-middle mb-0">
              <thead class="bg-light text-muted small text-uppercase">
                <tr>
                  <th class="ps-4">Usuario</th>
                  <th>Método</th>
                  <th>Total</th>
                  <th class="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order._id" class="border-bottom">
                  <td class="ps-4">{{ order.user.email }}</td>
                  <td><span class="badge bg-light text-dark">{{ order.paymentMethod }}</span></td>
                  <td class="fw-bold text-brown">${{ order.total }}</td>
                  <td class="text-center"><span class="badge bg-success-subtle text-success px-3">Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import {
  getUsersAdmin,
  getOrdersAdmin,
  getProductsAdmin,
  createProductAdmin,
  deleteProductAdmin
} from '@/services/admin.service'

const users = ref<any[]>([])
const orders = ref<any[]>([])
const products = ref<any[]>([])
const name = ref('')
const price = ref<number | null>(null)


const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null> (null)




const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  imageFile.value = input.files[0]
  imagePreview.value = URL.createObjectURL(input.files[0])
}







const loadAll = async () => {
  try {
    users.value = (await getUsersAdmin()).data
    orders.value = (await getOrdersAdmin()).data
    products.value = (await getProductsAdmin()).data
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadAll)










const createProduct = async () => {
  if (!name.value || price.value === null || !imageFile.value) {
    Swal.fire(
      'Campos incompletos',
      'Incluye nombre, precio e imagen',
      'warning'
    )
    return
  }

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('price', price.value.toString())
  formData.append('image', imageFile.value)

  await createProductAdmin(formData)

  Swal.fire({
    icon: 'success',
    title: 'Producto creado',
    toast: true,
    position: 'top-end',
    timer: 2000,
    showConfirmButton: false
  })

  name.value = ''
  price.value = null
  imageFile.value = null
  imagePreview.value = null

  loadAll()
}








const removeProduct = async (id: string) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6F4E37',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    await deleteProductAdmin(id)
    loadAll()
    Swal.fire('Eliminado', 'El producto ha sido borrado', 'success')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/')
}
</script>




<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

.admin-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 260px;
  min-height: 100vh;
}

.main-content {
  background-color: #f8f9fa;
}

.bg-brown { background-color: #3b2b20 !important; }
.text-brown { color: #6F4E37; }
.text-coffee { color: #A67B5B; }
.bg-light-brown { background-color: rgba(111, 78, 55, 0.1); }

.admin-logo {
  height: 60px;
  border-radius: 10px;
}

.nav-link {
  color: rgba(255,255,255,0.7);
  padding: 12px 15px;
  border-radius: 8px;
  transition: 0.3s;
}

.nav-link:hover, .nav-link.active {
  color: white;
  background-color: rgba(132, 120, 120, 0.1);
}

.btn-coffee {
  background-color: #493628;
  color: white;
  border: none;
}

.btn-coffee:hover {
  background-color: #5a3e2b;
}

.stat-card {
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.stat-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.2rem;
}

.custom-input:focus {
  border-color: #443122;
  box-shadow: 0 0 0 0.25rem rgba(111, 78, 55, 0.1);
}

.animate-in {
  animation: slideUp 0.6s ease-out both;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}


</style> -->













































































<template>
  <div class="admin-layout d-flex">
    <aside class="sidebar-minimal p-4 d-none d-md-block">
      <div class="text-center mb-5 mt-3">
        <img src="@/assets/Logo_Beanmerce.png" alt="Logo" class="admin-logo mb-3 shadow-sm">
        <h6 class="fw-bold ls-2">ADMIN BEANMERCE</h6>
      </div>
      <nav class="nav flex-column gap-2">
        <a class="nav-link-minimal active" href="#"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a>
        <a class="nav-link-minimal" href="#"><i class="bi bi-box-seam me-2"></i> Inventario</a>
        <a class="nav-link-minimal" href="#"><i class="bi bi-people me-2"></i> Usuarios</a>
        <a class="nav-link-minimal" href="#"><i class="bi bi-receipt me-2"></i> Órdenes</a>
        <hr class="my-4 opacity-10">
        <button @click="logout" class="btn-logout-minimal">
          <i class="bi bi-box-arrow-left me-2"></i> SALIR
        </button>
      </nav>
    </aside>

    <main class="main-content-minimal flex-grow-1 p-5">
      <header class="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 class="fw-bold m-0 text-dark">Gestión General</h2>
          <p class="text-muted small m-0">Panel de control de productos y ventas</p>
        </div>
        <span class="badge-admin">ADMIN MODE</span>
      </header>

      <section class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="stat-card-minimal">
            <div class="stat-info">
              <span class="stat-label">Usuarios</span>
              <h3 class="stat-value">{{ users.length }}</h3>
            </div>
            <div class="stat-icon-minimal"><i class="bi bi-people"></i></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card-minimal">
            <div class="stat-info">
              <span class="stat-label">Órdenes</span>
              <h3 class="stat-value">{{ orders.length }}</h3>
            </div>
            <div class="stat-icon-minimal"><i class="bi bi-cart-check"></i></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card-minimal">
            <div class="stat-info">
              <span class="stat-label">Productos</span>
              <h3 class="stat-value">{{ products.length }}</h3>
            </div>
            <div class="stat-icon-minimal"><i class="bi bi-cup-hot"></i></div>
          </div>
        </div>
      </section>

      <div class="row g-5">
        <div class="col-lg-4">
          <div class="card-minimal-form">
            <h5 class="fw-bold mb-4">NUEVO PRODUCTO</h5>
            <div class="mb-3">
              <label class="label-minimal">Nombre del Café</label>
              <input v-model="name" class="input-minimal" placeholder="Ej: Espresso Intenso" />
            </div>
            <div class="mb-3">
              <label class="label-minimal">Precio (USD)</label>
              <input v-model.number="price" type="number" class="input-minimal" placeholder="0.00" />
            </div>

            <div class="mb-3">
              <label class="label-minimal">Imagen del Producto</label>
              <input type="file" class="input-minimal" accept="image/*" @change="onFileChange" />
            </div>

            <div v-if="imagePreview" class="mb-4 text-center">
              <img :src="imagePreview" class="preview-img-minimal shadow-sm" />
            </div>

            <button @click="createProduct" class="btn-primary-minimal w-100 mt-2">
              <i class="bi bi-plus-lg me-1"></i> Agregar al catálogo
            </button>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="card-minimal-table">
            <h5 class="fw-bold mb-4">CATÁLOGO ACTUAL</h5>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th class="text-muted small">PRODUCTO</th>
                    <th class="text-muted small">PRECIO</th>
                    <th class="text-end text-muted small">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product._id">
                    <td class="fw-semibold">{{ product.name }}</td>
                    <td class="text-coffee fw-bold">${{ product.price }}</td>
                    <td class="text-end">
                      <button @click="removeProduct(product._id)" class="btn-delete-minimal">
                        <i class="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section class="mt-5">
        <h5 class="fw-bold text-dark mb-3">Historial de Órdenes</h5>
        <div class="card-minimal-table">
          <div class="table-responsive">
            <table class="table align-middle mb-0">
              <thead class="bg-light-minimal text-muted small uppercase">
                <tr>
                  <th class="ps-4">Usuario</th>
                  <th>Método</th>
                  <th>Total</th>
                  <th class="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order._id" class="border-bottom-faint">
                  <td class="ps-4 text-muted small">{{ order.user.email }}</td>
                  <td><span class="badge-method">{{ order.paymentMethod }}</span></td>
                  <td class="fw-bold text-dark">${{ order.total }}</td>
                  <td class="text-center"><span class="status-pill">Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import Swal from 'sweetalert2'
import {
  getUsersAdmin,
  getOrdersAdmin,
  getProductsAdmin,
  createProductAdmin,
  deleteProductAdmin
} from '@/services/admin.service'

const users = ref<any[]>([])
const orders = ref<any[]>([])
const products = ref<any[]>([])
const name = ref('')
const price = ref<number | null>(null)
const imageFile = ref<File | null>(null)
const imagePreview = ref<string | null> (null)

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return
  imageFile.value = input.files[0]
  imagePreview.value = URL.createObjectURL(input.files[0])
}

const loadAll = async () => {
  try {
    users.value = (await getUsersAdmin()).data
    orders.value = (await getOrdersAdmin()).data
    products.value = (await getProductsAdmin()).data
  } catch (e) {
    console.error(e)
  }
}

onMounted(loadAll)

const createProduct = async () => {
  if (!name.value || price.value === null || !imageFile.value) {
    Swal.fire('Campos incompletos', 'Incluye nombre, precio e imagen', 'warning')
    return
  }
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('price', price.value.toString())
  formData.append('image', imageFile.value)
  await createProductAdmin(formData)
  Swal.fire({ icon: 'success', title: 'Producto creado', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false })
  name.value = ''; price.value = null; imageFile.value = null; imagePreview.value = null;
  loadAll()
}

const removeProduct = async (id: string) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#342318',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  })
  if (result.isConfirmed) {
    await deleteProductAdmin(id)
    loadAll()
    Swal.fire('Eliminado', 'El producto ha sido borrado', 'success')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');

.admin-layout {
  min-height: 100vh;
  background-color: #fcfcfc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Sidebar Estilo Boutique */
.sidebar-minimal {
  width: 280px;
  background-color: #ffffff;
  border-right: 1px solid #f0f0f0;
}

.admin-logo {
  height: 50px;
  border-radius: 8px;
}

.ls-2 { letter-spacing: 2px; font-size: 0.75rem; color: #1a1a1a; }

.nav-link-minimal {
  color: #888;
  text-decoration: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: 0.3s;
}

.nav-link-minimal:hover, .nav-link-minimal.active {
  color: #342318;
  background-color: #fdfaf8;
}

.btn-logout-minimal {
  background: none;
  border: none;
  color: #cc0000;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 12px 18px;
  text-align: left;
}

/* UI Elements */
.badge-admin {
  background-color: #fdfaf8;
  color: #A67B5B;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 800;
  border: 1px solid #eee;
}

.stat-card-minimal {
  background: white;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label { font-size: 0.7rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 1px; }
.stat-value { font-weight: 800; font-size: 1.8rem; margin: 0; color: #342318; }
.stat-icon-minimal { font-size: 1.5rem; color: #A67B5B; background: #fdfaf8; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 15px; }

/* Forms & Tables */
.card-minimal-form, .card-minimal-table {
  background: white;
  padding: 30px;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
}

.label-minimal { font-size: 0.7rem; font-weight: 700; color: #555; margin-bottom: 8px; display: block; }
.input-minimal {
  width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #eee; outline: none; font-size: 0.9rem; transition: 0.3s;
}
.input-minimal:focus { border-color: #A67B5B; box-shadow: 0 0 0 4px rgba(166, 123, 91, 0.05); }

.preview-img-minimal { width: 100%; height: 160px; object-fit: cover; border-radius: 15px; }

.btn-primary-minimal {
  background: #342318; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; transition: 0.3s;
}
.btn-primary-minimal:hover { background: #5a3e2b; transform: translateY(-2px); }

.btn-delete-minimal {
  background: none; border: none; color: #eee; font-size: 1.2rem; transition: 0.3s;
}
.btn-delete-minimal:hover { color: #cc0000; }

.text-coffee { color: #A67B5B; }
.badge-method { background: #f8f9fa; color: #666; font-size: 0.65rem; padding: 4px 10px; border-radius: 6px; font-weight: 700; }
.status-pill { background: #eafaf1; color: #28a745; font-size: 0.65rem; font-weight: 800; padding: 5px 15px; border-radius: 50px; }
.border-bottom-faint { border-bottom: 1px solid #f9f9f9; }
</style>