<template>
  <div class="container">
    <hr />
    <div class="logo">
      <img src="../assets/logo1.png" width="150" />
    </div>

    <div class="skor-table">
      <b>Skor Tablosu</b>
      <table>
        <tr>
          <th>Sıra</th>
          <th>Adı</th>
          <th>Skor</th>
          <th>Zaman</th>
        </tr>
        <tr v-for="(score,index) of scores" :key="score.point">
          <td style="text-align: center;">{{ index + 1 }}</td>
          <td style="text-align: center;">{{ score.userName }}</td>
          <td style="text-align: center;">{{ score.point }}</td>
          
         <td style="text-align: center;"> <span style="float: center;">{{ Math.floor(score.second/60) }}&nbsp; dk &nbsp; {{ score.second % 60 }}&nbsp; sn &nbsp;</span>
       </td>
       </tr>
      </table>
      </div>
      <div class="button">
      <router-link to="/gamePage">
        <button>Tekrar Oyna</button>
      </router-link>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "scoreTable",
    data: () => ({
      disabled: false,
      readonly: false,
      dataa:{},
      scores:[],
      score:''
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
  height: 500%;
  padding: 1rem 0;
  width: 1000px;
  border-radius: 10px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
}

.logo {
  text-align: center;
  margin: 1rem 0;
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
  border-radius: 10px;
}
button {
  border: none;
  border-radius: 10px;
  color:white;
  background-color: green;
  padding: 1rem 3.3rem;
  margin-left: 385px;
  margin-right: 400px;
}

table {
  width: 100%;
}


</style>