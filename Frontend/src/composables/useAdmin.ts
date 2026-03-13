
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import {
  getUsersAdmin,
  getOrdersAdmin,
  getProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin
} from '@/services/admin.service'
import router from '@/router'

export function useAdmin() {

  const users = ref<any[]>([])
  const orders = ref<any[]>([])
  const products = ref<any[]>([])
  const name = ref('')
  const price = ref<number | null>(null)
  const imageFile = ref<File | null>(null)
  const imagePreview = ref<string | null>(null)

  // Manejo de archivo
  const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files || !input.files[0]) return
    imageFile.value = input.files[0]
    imagePreview.value = URL.createObjectURL(input.files[0])
  }

  // Cargar datos
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

  // Crear producto
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

    // Reset
    name.value = ''
    price.value = null
    imageFile.value = null
    imagePreview.value = null

    loadAll()
  }

  // Eliminar producto
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

  // Actualizar producto
  const updateProduct = async (product: any) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar producto',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Nombre" value="${product.name}" />
        <input id="swal-price" type="number" class="swal2-input" placeholder="Precio" value="${product.price}" />
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
        return { name, price: Number(price) }
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

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    router.push('/')
  }

  return {
    users,
    orders,
    products,
    name,
    price,
    imageFile,
    imagePreview,
    onFileChange,
    loadAll,
    createProduct,
    removeProduct,
    updateProduct,
    logout
  }
}