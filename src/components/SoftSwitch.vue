<template>
  <div class="form-check form-switch">
    <input
      :id="id"
      class="form-check-input"
      :class="$attrs.class"
      type="checkbox"
      :name="name"
      :checked="checked"
    />
    <label class="form-check-label" :class="labelClass" :for="id">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "SoftSwitch",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">

.form-switch .form-check-input:checked:after {
    transform: translateX(21px);
}

.form-switch .form-check-input:after {
    transition: transform .25s ease-in-out,background-color .25s ease-in-out;
    content: "";
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    transform: translateX(1px);
    box-shadow: 0 0.25rem 0.375rem -0.0625rem rgb(20 20 20 / 12%), 0 0.125rem 0.25rem -0.0625rem rgb(20 20 20 / 7%);
    top: 1px;
}
*, :after, :before {
    box-sizing: border-box;
}

</style>