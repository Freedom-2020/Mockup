<template>
  <div>
    <header><h1 class="t_center header_text">Mockup</h1></header>
    <section class="flex">
      <aside class="aside">
        <FormItemBox />
      </aside>
      <article class="article_container">
        <BuildForm />
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script src="./Home.ts" lang="ts"></script>
<style lang="scss">
.aside{
  width: 200px;
  min-height: 500px;
}
.article_container{
  min-height: 500px;
  width: 100%;
}
.header_text{
  margin-bottom: 0;
  color: rgb(96, 177, 197);
}
</style>