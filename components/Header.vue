<template>
<div class="header">
        <div class="header__top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__left"></div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__right">
                            <div class="header__top__right__social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-pinterest-p"></i></a>
                            </div>
                            <div class="header__top__right__auth">
                            <a v-if="user" href="#" @click="logout">Logout</a>
                            <NuxtLink v-else to="login">Login</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-1">
                    <div class="header__logo">
                        <a href="./index.html"><img src="img/logo.png" alt=""></a>
                    </div>
                </div>
                <div class="col-lg-8">
                    <nav class="header__menu">
                        <ul>
                            <li><NuxtLink to="/drop">Drop page</NuxtLink></li>
                            <li><NuxtLink to="/add">Add user</NuxtLink></li>
                            <li><NuxtLink to="/product">Add Product</NuxtLink></li>
                            <li><NuxtLink to="/list">List Product</NuxtLink></li>
                            <li><NuxtLink to="/history">History</NuxtLink></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-3">
                    <div class="header__cart">
                        <ul>
                            <li><NuxtLink to="/cart"><i class="fa fa-shopping-bag"></i> <span>{{ cart }}</span></NuxtLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="humberger__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    computed: {
     user () {
       return this.$store.state.users.user;
      },
       cart () {
       return (this.$store.state.products.cart).length;
      }
    },
    methods: {
        async logout() {
      	await this.$fire.auth.signOut();
      	this.$router.replace("/login");
    	},
    },
  }
</script>