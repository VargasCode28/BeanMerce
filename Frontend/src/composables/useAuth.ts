import { ref } from 'vue'
import { loginRequest } from '@/services/auth.service';
import router from '@/router';
import Swal from 'sweetalert2';  



export function useAuth() {



const email = ref('')
const password = ref('')

const isLoading = ref(false)  



const Toast = Swal.mixin({   
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




return {
    email,
    password,
    isLoading,
    login
}
};


