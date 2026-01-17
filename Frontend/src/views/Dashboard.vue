
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


                      <button @click="updateProduct(product)" class="btn-delete-minimal"> <!--NEW FUNCTION UPDATE-->

                        <i class="bi bi-pencil"></i>

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
  updateProductAdmin,  //New update for the product
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






const updateProduct = async (product: any) => {
  const { value: formValues } = await Swal.fire({
    title: 'Editar producto',
    html: `
      <input 
        id="swal-name" 
        class="swal2-input" 
        placeholder="Nombre"
        value="${product.name}"
      />
      <input 
        id="swal-price" 
        type="number"
        class="swal2-input" 
        placeholder="Precio"
        value="${product.price}"
      />
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const name = (document.getElementById('swal-name') as HTMLInputElement).value
      const price = (document.getElementById('swal-price') as HTMLInputElement).value

      if (!name || !price) {
        Swal.showValidationMessage('Todos los campos son obligatorios')
        return
      }

      return {
        name,
        price: Number(price)
      }
    }
  })

  if (!formValues) return

  try {
    await updateProductAdmin(product._id, formValues)

    Swal.fire('Actualizado', 'Producto editado correctamente', 'success')
    loadAll()
  } catch (error) {
    Swal.fire('Error', 'No se pudo actualizar el producto', 'error')
  }
}








const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/')
  
}
</script>











<style scoped

src="/src/styles/Dashboard.css"

>
</style>