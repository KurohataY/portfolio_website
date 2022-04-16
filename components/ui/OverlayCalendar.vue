
<template>
    <div id="overlay_calendar_box" v-if="overlay" class="pa-4" @click="updateState(!overlay)" >
        <teleport to="body">
            <TopUiCalendar id="dialog" v-if="overlay" />
        </teleport>
    </div>
</template>

<script lang="ts" setup>
const { stateValue, updateState } = useOverlayCalendar();

const overlay = ref(stateValue)

const isVisible = {
    required: overlay,
    type: Boolean,
    default: false,
}

watch(
    () => stateValue.value,
    (overlayStateValue) => {
        overlay.value = overlayStateValue
    }
)

</script>

<style lang="scss" scoped>
#overlay_calendar_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 95% !important;
    z-index: 2147483646;
}

#dialog {
    z-index: 2147483647;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2147483647;
}
</style>