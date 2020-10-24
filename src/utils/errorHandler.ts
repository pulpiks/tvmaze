import { AxiosError, AxiosResponse } from 'axios'

interface TCustomError extends AxiosError {
  status: number | AxiosError<any>['code'],
  data?: AxiosResponse<any>['data']
}

const extendAxiosError = (error: AxiosError) => {
  const customError: TCustomError = {
    ...error,
    status: error.code ? Number(error.code) : 0,
    message: ''
  }
  if (error.isAxiosError) {
    if (typeof error.response !== 'undefined') {
      const code = error.response.status
      customError.message = error.response.statusText
      customError.status = code
      if (Object.prototype.hasOwnProperty.call(error.response, 'data')) {
        customError.data = error.response.data
      }
    }
  } else {
    customError.message = error.message
  }
  return customError
}

export const generalErrorHandler = (vueInstance: any) => (error: any) => {
  const code = error.status
  const title = vueInstance.$t('error.general.message')
  const description = +error.status !== 400 ? `${code} - ${error.message}` : error.data
  // create bootstrap-vue toastr for errors
  vueInstance.$bvToast.toast(description, {
    title,
    autoHideDelay: 5000,
    solid: true,
    variant: 'danger',
    toaster: 'b-toaster-top-center'
  })
}

export default extendAxiosError
