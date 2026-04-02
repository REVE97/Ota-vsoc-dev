<template>
    <div v-if="modalInfo?.on && modalInfo?.type === 'onebtn'" class="onebtn">
        <ModalOnebtn :modalInfo="modalInfo"></ModalOnebtn>
    </div>

    <ModalTwobtn v-else-if="modalInfo?.on && modalInfo?.type === 'twobtn'" :modalInfo="modalInfo"></ModalTwobtn>

</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import ModalOnebtn from '@/components/modal/ModalOnebtn.vue';
import ModalTwobtn from '@/components/modal/ModalTwobtn.vue';

const store = useAppStore();

onMounted(() => {
    if (store.modalInfo === true) store.clearModalInfo();
});

const modalInfo = computed(() => store.modalInfo);
</script>

<style scoped>
.onebtn :deep(.button) {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>