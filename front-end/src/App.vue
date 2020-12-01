<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img style="width: 50%;" src="/couple.png">
      </div>
    </router-link>
    <p></p>
    <div class="title">
      <h1>Winter WonderLove</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/create">Create a Profile</router-link>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: red;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

.logo{
  width: 20% !important;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
