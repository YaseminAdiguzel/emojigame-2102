<template>
  <div class="container">
    <b class="small-text">Emoji Game</b>
    <hr />
    <div class="logo">
      <img src="../assets/logo1.png" width="150" />
    </div>
    <p><b>Lütfen Kullanıcı Adınızı Girin</b></p>
    <br /><br />
    <form>
      <label for="fname"><b>Kullanıcı Adı: </b></label>

      <input
        required
        type="text"
        @input="checkInput"
        @click="clicked = true"
        id="fname"
        name="fname"
        v-model="fname"
        style:input
      /><br />
      <label v-if="!fname && clicked" class="text-center"
        >Lütfen Kullanıcı Adını Girin..</label
      ><br />
      <label v-if="error" class="text-center"
        >Bu Kullanıcı Adı Zaten Var. Lütfen Farklı Bir Kullanıcı Adı
        Girin</label
      ><br />
      <label v-if="showWarning" class="text-center"
      >Lütfen geçerli bir kullanıcı adı girin</label>
      <br />
    </form>
    <div class="button">
      <button @click="login()" :disabled="!validInput || error">
        Oyuna Başla
      </button>
    </div>
    <div class="ikinciCizgi"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "loginPage",
  data: () => ({
    fname: "",
    values: [],
    error: false,
    validInput: false,
    deneme: false,
    clicked: false,
    selection: null,
    film:false,
    atasozu:false,
    sarki:false,
    kategori:"",
    showWarning: false,
  }),

  computed: {
    newValue: function () {
      return this.fname;
    },
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8082/api/users/add-user", {
          userName: this.fname,
        })

        .then((response) => {
          console.log(response);
          if (response.data.success) {
            console.log(response.data.data.id);
            localStorage.setItem("userName", this.fname);
            localStorage.setItem("userId", response.data.data.id);
            this.$router.push("/gamePage");
          }
        })
        .catch((error) => {
          if (error) {
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 5000);
            console.log(this.fname);
            this.fname = "";
            this.clicked = false;
          }
          console.log(error + " : merhaba");
        });
    },

    checkInput() {
      // Kullanıcının girdiği değeri kontrol eder.(space durumu)
      this.validInput = this.fname.trim().length > 0;
    },
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  margin-top: 5rem;
  border: 4px solid #333;
  height: 700px;
  padding: 1rem 0;
  width: 1000px;
  border-radius: 10px;
}

b {
  margin-left: 0.6rem;
  font-size: larger;
  position: relative;
  top: -5px;
}
label b{
  margin-left: 0.6rem;
  font-size: larger;
  position: relative;
  top: 3.5px;
}
.v-speed-dial {
  position: absolute;
}
form {
  text-align: center;
  
}
form input, form textarea {
  height: 40px;
}
.text-center {
  padding-left: 7.2rem;
}

.logo {
  text-align: center;
  margin: 4rem 0rem;
}

form input {
  border: aqua;
  padding: 10px;
  text-align: left;
  outline: auto;
  margin: 10px;
  width: 20%;
  height: 2rem;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: -25px; 
}

hr {
  width: 100% !important;
  margin-top: 0.4rem;
  border-top: 4px solid #333;
  opacity: 1;
}

p b {
  margin-left: 370px;
  font-size: larger;
}

/* label {
  margin-left: 325px;
} */

button {
  border: none;
  border-radius: 10px;
  color: white;
  background-color: green;
  text-decoration: none;
  padding: 1rem 4rem;
  margin-left: 390px;
  font-size: larger;
  margin-top: -50px; 
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* .my-green {
      background-color: green !important;
      color: white !important;
    }
 .v-card__title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
    line-height: 2rem;
    word-break: break-all;
    margin-left: 360px;
    margin-top: -50px;
    }
    .v-card__title + .v-card__subtitle, .v-card__title + .v-card__text {
    padding-top: 0;
    margin-left: 370px;
} */
</style>