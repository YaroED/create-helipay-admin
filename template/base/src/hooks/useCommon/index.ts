import { reactive } from 'vue'

export const useCommon = () => {
  let commonExpose = reactive({
    duplicateID: ''
  })

  return {
    commonExpose
  }
}
