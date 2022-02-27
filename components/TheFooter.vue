<template>
    <v-footer class="bg-grey-lighten-1">
        <v-row justify="center" no-gutters>
            <v-col class="text-center text-white" cols="12">
                {{ nowYear }} -
                <strong>{{ footerText }}</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script setup>

const nowYear = new Date().getFullYear();

const footerText = "Izanagi's Site";

</script>