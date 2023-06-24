<template>
    <div class="container">
        <div class="row">
            <img src="https://unsplash.it/600.jpg?image=251" @click="show(0)" class="img-fluid rounded">
            <img src="https://unsplash.it/600.jpg?image=252" @click="show(1)" class="img-fluid rounded">
            <img src="https://unsplash.it/600.jpg?image=253" @click="show(2)" class="img-fluid rounded">
        </div>
        <div class="row">
            <img src="https://unsplash.it/600.jpg?image=254" @click="show(3)" class="img-fluid rounded">
            <img src="https://unsplash.it/600.jpg?image=255" @click="show(4)" class="img-fluid rounded">
            <img src="https://unsplash.it/600.jpg?image=256" @click="show(5)" class="img-fluid rounded">
        </div>
            
    </div>

    <vue-easy-lightbox
      :visible="visibleRef"
      :imgs="imagesRef"
      :index="indexRef"
      @hide="onHide"
    />
</template>


<script>
import { ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
    components: {
        VueEasyLightbox
    },
    setup() {
        const visibleRef = ref(false)
        const indexRef = ref(0)
        const imagesRef = [
                'https://unsplash.it/1200/768.jpg?image=251',
                'https://unsplash.it/1200/768.jpg?image=252',
                'https://unsplash.it/1200/768.jpg?image=253',
                'https://unsplash.it/1200/768.jpg?image=254',
                'https://unsplash.it/1200/768.jpg?image=255',
                'https://unsplash.it/1200/768.jpg?image=256'
            ]
        const show = (index) => {
            indexRef.value = index
            console.log(indexRef.value)
            visibleRef.value = true
        }
        const onHide = () => {
            visibleRef.value = false
        }

        return {
            visibleRef,
            indexRef,
            imagesRef,
            show,
            onHide
        }
    }
}

</script>


<style>
.row {
    margin: 15px;
}
</style>