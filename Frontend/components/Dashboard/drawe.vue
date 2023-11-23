<script>
  export default {
  data() {
  return {
    items: [
      { text: 'Usuairios', icon:'mdi-account' }
    ]
  }
}
}
</script>

<template>
    <v-navigation-drawer
    app
    color="#ffffff"
    permanent
    left 
    width="300" 
    > <!---->
      <v-list>
        <v-list-item> 
          <v-list-item-avatar>
            <v-img :src="require('/assets/img/perro.png')"></v-img>
          </v-list-item-avatar> 
          <v-list-item-title>
            little dogs 
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav dense>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
                {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
