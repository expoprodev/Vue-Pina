<template>
  <body>
  <div class="modal-container">
    <div id="selectPicture" class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <h5 class="titr-style">Move and Scale</h5>

            <div>
              <img ref="imageRef" :src="imageCropperStore.data.imageSrc" alt="" class="block max-w-full"/>
            </div>

            <input
                id="image-picker"
                :style="{ display: 'none' }"
                accept=".png, .jpg, .jpeg"
                type="file"
                @change="fileChanged"
            />

            <a class="link-style" @click="imageCropperStore.openFilePicker">Upload another picture</a>

            <div class="btn-row">
              <Button text="cancel" @click="fileCleared"/>
              <Button :disabled="imageCropperStore.isLoading" text="apply" @click="handleImageCropped"/>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </body>

</template>

<script>
import {defineComponent, onMounted, onUnmounted, ref,} from 'vue';
import Cropper from 'cropperjs';
import Button from "@/components/common/Button.vue";
import router from "@/router";
import {useImageCropperStore} from "@/store/imageCropper";

export default defineComponent({
  name: 'ImageCropper',
  components: {
    Button
  },
  setup() {
    const imageCropperStore = useImageCropperStore()

    const imageRef = ref(null);
    const fileReader = new FileReader();
    let cropper = null;

    fileReader.onload = (event) => {
      imageCropperStore.data.imageSrc = event.target.result;
      if (imageCropperStore.data.imageSrc) {
        cropper.replace(imageCropperStore.data.imageSrc);
      }
    };

    const handleImageCropped = () => {
      const imageBase64 = cropper
          .getCroppedCanvas({
            width: 256,
            height: 256,
          })
          .toDataURL('image/jpg')

      if (imageBase64) {
        imageCropperStore.dataURLtoFile(imageBase64, 'profileImage.jpg').then((file) => {
          imageCropperStore.updateProfileImage(file).then(() => {
            router.back();
          }).catch(() => {
          })
        })
      }

      imageCropperStore.data.selectedFile = null;
    };

    const fileChanged = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        imageCropperStore.data.selectedFile = files[0];

        if (imageCropperStore.data.selectedFile) {
          fileReader.readAsDataURL(imageCropperStore.data.selectedFile);
        } else {
          imageCropperStore.data.imageSrc = null;
        }
      }
    };

    const fileCleared = () => {
      imageCropperStore.data.selectedFile = null;
      router.back()
    };

    onMounted(() => {
      imageCropperStore.openFilePicker()

      cropper = new Cropper(imageRef.value, {
        aspectRatio: 1,
        scalable: false,
        zoomable: false
      });
    });

    onUnmounted(() => {
      cropper.destroy();
    });

    return {
      imageRef,
      fileChanged,
      fileCleared,
      handleImageCropped,
      imageCropperStore
    };
  },
});
</script>