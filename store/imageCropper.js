import {defineStore} from "pinia";
import imageCropperService from "@/services/imageCropperService";

export const useImageCropperStore = defineStore({
    id: "imageCropper",

    state: () => {
        return {
            data: {
                imageSrc: null,
                selectedFile: null,
            },
            isLoading: false,
        }
    },
    actions: {
        async updateProfileImage(imageFile) {
            this.isLoading = true
            await imageCropperService.updateProfileImage(imageFile)
            this.isLoading = false
        },
        async openFilePicker() {
            document.getElementById('image-picker').click();
        },
        async dataURLtoFile(dataUrl, filename) {
            let arr = dataUrl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, {type: mime});
        },
    }
});
