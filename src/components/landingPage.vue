<template>
  <div class="container">
    <hr />
    <div class="logo">
      <img src="../assets/logo1.png" width="150" />
    </div>

    <div class="conditions">
      <ul>
        <li><b>Şimdi sana çeşitli atasözü, film ve şarkı sözlerini emojilerle anlatıyoruz ve tahmin etmeni istiyoruz.</b><img src="../assets/bir.png" width="25" /></li>
        <li><b>Unutma ki her soru 20 puan ve her soru için 30 saniyen var.</b><img src="../assets/iki.png" width="25" /></li>
        <li><b>Ayrıca 3 pas hakkın bulunmakta.</b><img src="../assets/üç.png" width="25" /></li>
        <li><b>Yanlış bildiğin soruları da sıfır puan olarak değerlendireceğiz.</b><img src="../assets/beş.png" width="25" /></li>
        <li><b>Haydi başlıyoruz. Keyifli emojilerr!</b><img src="../assets/dört.png" width="25" /></li>
      </ul>
    </div>

    <div class="button">
      <router-link to="/loginPage">
        <button>Oyuna Başla</button>
      </router-link>
    </div>

    <v-expansion-panels
      v-model="panel"
      :disabled="disabled"
      single
    >
    <v-expansion-panel>
    <div class="skor-table">
      <b>Skor Tablosu</b>
      <table class="main-table">
          <tr>
          <th>Sıra</th>
          <th>Adı</th>
          <th>Skor</th>
          <th>Zaman</th>
        </tr>
        <tr v-for="(score,index) of scoresFirstFive" :key="score.point">
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td style="text-align: center;">{{ score.userName }}</td>
          <td style="text-align: center;">{{ score.point }}</td>
          <span style="float: left;">{{ Math.floor(score.second/60) }}&nbsp; dk &nbsp; {{ score.second % 60 }}&nbsp; sn &nbsp;</span>
        </tr>
      </table>
    <v-expansion-panel-content style="padding: 0 !important">
      
        
        <tr v-for="(score,index) of scoresLast" :key="score.point">
          <td style="text-align: center;">{{ index + 4 }}</td>
          <td style="text-align: center;">{{ score.userName }}</td>
          <td style="text-align: center;">{{ score.point }}</td>
          <span style="float: left;">{{ Math.floor(score.second/60) }}&nbsp; dk &nbsp; {{ score.second % 60 }}&nbsp; sn &nbsp;</span>
        </tr>
       
    </v-expansion-panel-content>
  </div>
    <v-expansion-panel-header @click="showMore = !showMore">
      {{ showMore ? 'Daha Az Göster' : 'Daha Fazla Göster' }}
  </v-expansion-panel-header>
</v-expansion-panel>
</v-expansion-panels>
    <hr />
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "landingPage",
    data: () => ({
      panel: [0, 1],
      disabled: false,
      readonly: false,
      dataa:{},
      scoresFirstFive: [],
      scoresLast: [],
      scores:[],
      score:'',
      showMore: false,
    }),

    created() {
    this.getScores();
    
  },
    methods: {
      
    getScores() {
      console.log("asd")
      axios.get("http://localhost:8082/api/scores/get-all-game-result").then(response => {
         console.log(response)
         this.dataa=response
         this.scores=this.dataa.data.data
        this.scores.sort((a, b) => {
           if (b.point === a.point) {
            return a.second - b.second;
          } 
          return b.point - a.point;
        });

        this.scoresFirstFive = this.scores.slice(0,3);
        this.scoresLast = this.scores.slice(3);
        console.log("sorted:",  this.scores.map(s => s.point))
      });
    },
  }
}
</script>

<style scoped>
.container {
  margin: auto;
  margin-top: 5rem;
  border: 4px solid #333;
  height: 100%;
  padding: 1rem 0;
  width: 1000px;
  border-radius: 10px;
}

img {
  margin-bottom: -5px;
}

tr td{
  width: 200px;
}

.logo {
  text-align: center;
  margin: 1rem 0;
}

.conditions {
  border: 4px solid #333;
  margin: 1rem;
  padding: 1rem;
}

button {
  border: none;
  border-radius: 10px;
  color:white;
  background-color: green;
  padding: 1rem 3.3rem;
  margin-left: 400px;
  margin-right: 400px;
}


hr {
  width: 100% !important;
  margin: 1rem 0;
  border-top: 4px solid #333;
  opacity: 1;
}

.skor-table {
  padding: 1rem;
  margin: 1rem;
  border: 4px solid #333;
  display: block;
}

/* .skor-table2  {
  padding: 0 1rem 0 0;
    margin: 0 0.5rem 0 0;
 
}  */

table tr{
  text-align: left;
}

.v-expansion-panel-content div{
padding: 0 !important;
}
.v-expansion-panel-header {
  margin: auto;
  padding-left: 26rem;
  color: black;
  background-color: transparent;
}

.v-expansion-panel::before{
  box-shadow: none;
}

a,
a:hover {
  color: #333;
  text-decoration: none;
}

ul li {
  list-style-type: disc;
  margin-left: 1rem;
  margin: 10px;
}

.main-table {
  padding:0 20px;
}
.main-table th{
  text-align: center;
}
.container div {
  border-radius: 10px;
}

</style>