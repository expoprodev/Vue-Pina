<template>
  <div v-for="tool in checkBoxComponentModel" :key="tool.id">

    <CheckBox v-model="tool.isChecked" :value="tool.value">
      {{ tool.title }}
    </CheckBox>

    <div v-if="tool.subOptions" class="sub-option">
      <CheckBox v-for="subOption in tool.subOptions" :key="subOption.id" v-model="subOption.isChecked"
                :value="subOption.value">
        {{ subOption.title }}
      </CheckBox>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import CheckBox from "@/components/common/CheckBox.vue";

export default {
  name: "CheckBoxContainer",
  components: {
    CheckBox,
  },
  props: {
    modelValue: Array,
  },
  setup(props, {emit}) {
    const checkBoxComponentModel = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {checkBoxComponentModel}
  }
}
</script>

<style scoped>

</style>