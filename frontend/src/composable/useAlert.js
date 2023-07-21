import Swal from 'sweetalert2'

export const useAlert = () => {
  const showAlert = (icon, title, showConfirm, text = '') => {
    if (showConfirm) {
      return Swal.fire({
        icon,
        title,
        text,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      })
    }

    return Swal.fire({
      icon,
      title
    })
  }

  return { showAlert }
}
