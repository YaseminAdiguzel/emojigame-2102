<template>
  <div style="display: flex">
    <div
      style="flex: 1; z-index: 5; position: relative; background-color: white"
    ></div>
    <div class="container">
      <b> 00:{{ timerCount > 9 ? timerCount : "0" + timerCount }}</b>
      <div style="float: right">
        <a>
          <i ref="heart1" class="fa-sharp fa-solid fa-heart"></i>
          <i ref="heart2" class="fa-sharp fa-solid fa-heart"></i>
          <i ref="heart3" class="fa-sharp fa-solid fa-heart"></i>
          <i class="fa-solid fa-check"></i>
        </a>
        <span class="dogru-cevap-sayisi">{{ dogruCevapSayisi }}</span>
        <i> </i>
        <link rel="stylesheet" href="path/to/alertify-style.css" />
      </div>
      <hr style="clear: both" />
      <marquee direction="right">
        <svg
          v-for="(item, index) in 1000"
          :key="index"
          width="80px"
          height="20px"
        >
          <rect
            x="5"
            y="5"
            width="5"
            height="20"
            style="fill: black; opacity: 0.9"
          />
        </svg>
      </marquee>

      <div class="container2" style="z-index: 0; position: relative">
        <div class="row">
          <div v-if="asdf" class="emoji">
            <img :src="imageUrl" width="200" />
          </div>
          <div v-if="asdf" class="emoji">
            <img :src="imageUrl2" width="200" />
          </div>
          <div v-if="asdf" class="emoji">
            <img :src="imageUrl3" width="200" />
          </div>
          <div v-if="asdf && abc" class="emoji">
            <img :src="imageUrl4" width="200" />
          </div>
        </div>
      </div>

      <marquee direction="right">
        <svg
          v-for="(item, index) in 1000"
          :key="index"
          width="80px"
          height="20px"
        >
          <rect
            x="5"
            y="5"
            width="5"
            height="20"
            style="fill: black; opacity: 0.9"
          />
        </svg>
      </marquee>
      <label>{{ category }}</label>
      <form Game="/Game">
        <form @submit.prevent="checkAnswer">
          <input
            type="text"
            @click="clicked = true"
            id="answer"
            name="answer"
            v-model="answer"
            style:input
          />
          <label v-if="!answer && clicked" class="text-center"
            ><b>Lütfen Cevap Girin..</b></label
          >

          <div class="login-button-container">
            <button ref="pasButton" @click="pasGec()">
              Pas <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
            <button
              @click="getAnswer()"
              :disabled="!answer"
              :class="{ 'disabled-button': !answer }"
            >
              Cevapla <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </form>
      </form>
      <label>{{ numbers.length }} / {{ questionNumber }}</label>
      <div class="menu">
        <div id="overlay" @click="menu_expand = false" v-if="menu_expand"></div>
        <i @click="menu_expand = !menu_expand" class="fa-solid fa-bars"></i>
        <ul v-if="menu_expand">
          <div class="menu1">
            <p class="menu_first_item">ATASÖZÜNÜ BUL</p>
            <div>
              <hr />
              <a class="menu_second_item" href="/loginpage">Yeniden başla</a>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div
      style="flex: 1; z-index: 5; position: relative; background-color: white"
    ></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "gamePage",

  data() {
    return {
      timerCount: 30,
      menu_expand: false,
      heartCount: 3,
      questions: {},
      asdf: false,
      abc: true,
      imageUrl: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
      imageUrl5: "",
      questionId: this.randomNumber(),
      answer: "",
      userId: 0,
      pasHakki: 3,
      dogruCevapSayisi: 0,
      timer: null,
      clicked: "",
      numbers: [],
      category: "",
      questionNumber: 10,
    };
  },

  mounted() {},

  created() {
    let userId = localStorage.getItem("userId");

    this.userId = userId;
    console.log(userId);

    this.fetchQuestions();

    this.asdf = true;

    // axios
    //     .get(
    //       "http://localhost:8082/api/questions/get-all-questions"
    //     )
    //     .then((response) => {
    //       console.log(response.data)
    //       this.questionNumber = response.data.data.length;
    //     })
  },
  methods: {
    fetchQuestions() {
      // + "&kategori=" + this.kategori get isteğine eklenecek

      axios
        .get(
          "http://localhost:8082/api/questions/get-emojis-for-related-question?questionId=" +
            this.questionId
        )
        .then((response) => {
          this.numbers.push(this.questionId);
          console.log(response);
          console.log(this.imageUrl4);
          this.questions = response;
          this.category =
            this.questions.data.data[0].category.charAt(0).toUpperCase() +
            this.questions.data.data[0].category.slice(1);
          // console.log(this.questions.data.data[0].imageUrl)
          this.imageUrl = this.questions.data.data[0].imageUrl;
          this.imageUrl2 = this.questions.data.data[1].imageUrl;
          this.imageUrl3 = this.questions.data.data[2].imageUrl;
          this.imageUrl4 = this.questions.data.data[3].imageUrl;
          this.imageUrl5 = this.questions.data.data[4].imageUrl;
        });
    },

    getAnswer() {
      axios
        .post("http://localhost:8082/api/answers/get-answer", {
          questionId: this.questionId,
          answerName: this.answer,
          userId: this.userId,
        })
        .then((response) => {
          // console.log(response)

          if (response.data.success) {
            this.dogruCevapSayisi++;
            if (this.numbers.length == 10) {
              this.resultScreen("Oyun Bitti");
            } else {
              this.questionId = this.randomNumber();
              while (this.numbers.includes(this.questionId)) {
              this.questionId = this.randomNumber();
              }
              this.clearImages();
              this.$toasted.success("Doğru Cevap");
              setTimeout(() => {
              this.fetchQuestions();
              clearTimeout(this.timer);
              this.answer = "";
              this.timerCount = 30;
             }, 1000);
            }
          } else {
            this.$toasted.error("Yanlış Cevap");
            if (this.numbers.length == 10) {
              this.resultScreen("Oyun Bitti");
            } else {
              setTimeout(() => {
              this.questionId = this.randomNumber();
              while (this.numbers.includes(this.questionId)) {
                this.questionId = this.randomNumber();
              }
              this.clearImages();
              this.fetchQuestions();
              this.decrementHeart();
              clearTimeout(this.timer);
              this.answer = "";
              this.timerCount = 30;
            }, 1000);
            }
          }
        });
    },
    pasGec() {
      this.pasHakki--;
      this.questionId = this.randomNumber();
      while (this.numbers.includes(this.questionId)) {
        this.questionId = this.randomNumber();
      }
      this.clearImages();
      this.decrementHeart();
      this.fetchQuestions();
      clearTimeout(this.timer);
      this.timerCount = 30;
    },

    decrementHeart() {
      if (this.heartCount > 0) {
        this.heartCount--;
        if (this.heartCount === 2) {
          this.$refs.heart3.style.display = "none";
        } else if (this.heartCount === 1) {
          this.$refs.heart2.style.display = "none";
        } else if (this.heartCount === 0) {
          this.$refs.heart1.style.display = "none";
          this.$refs.pasButton.style.backgroundColor = "gray";
          this.$refs.pasButton.style.pointerEvents = "none";
        }
      } else {
        this.resultScreen("Oyun Bitti");
      }
    },

    questionCount() {
      if (this.questionId === 9) {
        if (this.answer === true) {
          setTimeout(() => {
            this.$router.push("/scoreTable");
          }, 3000);
        } else {
          this.decrementHeart();
          clearTimeout(this.timer);
          this.timerCount = 30;
        }
      }
    },

    randomNumber() {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      return randomNumber;
    },

    resultScreen(resultText) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.zIndex = "999";
      document.body.appendChild(overlay);
      // navigate to score table after a delay
      const text = document.createElement("div");
      text.textContent = resultText;
      text.style.position = "absolute";
      text.style.top = "50%";
      text.style.left = "50%";
      text.style.transform = "translate(-50%, -50%)";
      text.style.color = "white";
      text.style.fontSize = "100px";
      overlay.appendChild(text);
      setTimeout(() => {
        this.$router.push("/scoreTable");
        // remove overlay after navigation
        overlay.remove();
      }, 5000);
    },

    clearImages() {
      this.imageUrl = "";
      this.imageUrl2 = "";
      this.imageUrl3 = "";
      this.imageUrl4 = "";
      this.imageUrl5 = "";
    },
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          this.timer = setTimeout(() => {
            this.timerCount--;
          }, 1000);
          // clearTimeout()
        } else if (value == 0) {
          if (this.numbers.length == 10) {
              this.resultScreen("Oyun Bitti");   
          }
          else {
          this.$toasted.info("Süre Bitti");
          setTimeout(() => {
            this.questionId = this.randomNumber();
            while (this.numbers.includes(this.questionId)) {
              this.questionId = this.randomNumber();
            }
            this.clearImages();
            this.decrementHeart();
            this.fetchQuestions();
            this.timerCount = 30;
          }, 1000);
        }
      }
      },
      immediate: true,
    },
    methods: {},
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
  position: relative;
  border-radius: 10px;
}

hr {
  width: 100% !important;
  margin: 1rem 0;
  border-top: 4px solid #333;
  opacity: 1;
}

/* .emoji {
  text-align: center;
  margin: 30px 0 0 0;
} */
/* .container2 {
  display: flex;
  justify-content: center;
  overflow: hidden;
  animation: slide 40s linear infinite;
  animation-play-state: running;
}

@keyframes slide {
  0% {
    transform: translateX(-100%); 
    animation-play-state: running;
  }
  33.33% {
    transform: translateX(0%);
    animation-play-state: paused;
  }
  
  100% {
    transform: translateX(0%);
    animation-play-state: running;
  }
} */

input {
  border: aqua;
  padding: 10px;
  text-align: center;
  outline: auto;
  margin: 30px;
  margin-left: 20rem;
  width: 40%;
  height: 2rem;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}

label b {
  margin-left: 450px;
}

button {
  border: none;
  border-radius: 10px;
  color: white;
  background-color: green;
  padding: 15px 32px;
  /* padding: 0.5rem 1.5rem; */
  margin: 1px 15px;
  /* margin-left: 28%; */
  margin-left: 250px;
  font-size: larger;
}

.disabled-button {
  background-color: gray;
  color: white;
}

.menu i {
  margin: 5px;
  font-size: larger;
}

div a i {
  margin: 5px;
  font-size: 2em;
}

b {
  margin: 5px;
  font-size: 2em;
  color: red;
  padding: 1rem;
}

label b {
  display: block;
  position: relative;
  margin-top: -50px;
  justify-content: center;
  align-items: center;
  margin-left: 390px;
  font-size: 25px;
  color: black;
}

.menu {
  position: absolute;
  font-size: 24px;
  bottom: 0;
  z-index: 1;
}

.menu1 {
  font-size: 16px;
  border: 4px solid #333;
  padding: 10px 0px;
  text-align: center;
  margin: 5px;
  position: absolute;
  bottom: 0px;
  left: 30px;
  width: 140px;
  z-index: 2;
}

.menu_first_item {
  padding: 0 5px;
  font-weight: bold;
  z-index: 2;
}

.menu_second_item {
  text-decoration: none;
  color: #333;
  z-index: 2;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}

#overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  z-index: 1;
}

.dogru-cevap-sayisi {
  font-size: 33px;
  margin-right: 10px;
}
label {
  margin-left: 480px;
  position: relative;
  top: 18px;
  font-size: 24px;
}
</style>