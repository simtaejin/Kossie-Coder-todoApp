import {onUnmounted, ref} from "vue";

export const useToast = () => {
    const toastMessage = ref('')
    const toastAlertType = ref('')
    const showToast = ref(false);
    const tiemout = ref()


    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        tiemout.value = setTimeout(() => {
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 7000)
    }

    onUnmounted(() => {
        clearTimeout()
    })

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
}