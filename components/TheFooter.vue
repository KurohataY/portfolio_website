<template>
    <v-footer app width="100%" style="background: linear-gradient(90deg,#59adf1,#cffd9d);">
        <v-row justify="center" no-gutters>
            <v-col class="text-center text-black" cols="12">
                {{ nowYear }} -
                <strong>{{ footerText }}</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script setup lang="ts">

const nowYear: number = new Date().getFullYear();

const footerText: string = "Izanagi's Site";

</script>
