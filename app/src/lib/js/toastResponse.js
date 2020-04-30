export default function toastResponse (response, title) {
  if (response.errors && Array.isArray(response.errors)) {
    // array of error messages
    response.errors.forEach((msg) => {
      window.toastr.error(msg)
    })
  } else if (response.error && typeof response.error === 'string') {
    window.toastr.error(response.error, title || response.title)
  } else if (response.warning) {
    window.toastr.warning(response.warning, title || response.title)
  } else if (response.info) {
    window.toastr.info(response.info, title || response.title)
  } else if (response.result) {
    window.toastr.success(response.result, title || response.title)
  } else if (response.success) {
    window.toastr.success(response.success, title || response.title)
  }
}
