<template>
  <div class="members">
    <div v-if="members">
      <h2>All Team Members ({{ members.length }})</h2>
      <ul>
        <li class="member" v-for="(member, index) in members" :key="index" @click="addMember(index)">
          {{ member.name }}
        </li>
      </ul>
    </div>
    <div v-if="attendingMembers">
      <h2>Attending Team Members ({{ attendingMembers.length }})</h2>
      <ul>
        <li class="addedMember" v-for="(member, index) in attendingMembers" :key="index" @click="removeMember(index)">
          {{ member.name }}
        </li>
      </ul>
    </div>
    <div v-if="suggestedVenues">
      <h2>Suggested venues ({{ suggestedVenues.length }})</h2>
      <ul>
        <li class="venue" v-for="venue in suggestedVenues" :key="venue">
          {{ venue }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Team",
        data() {
            return {
                attendingMembers: [],
                suggestedVenues: [],
                dislikedFood: [],
                likedDrink: []
            }
        },
        props: ['members', 'venues'],
        watch: {
            attendingMembers: function(){
                this.resetValues();

                // Add drink likes & food dislikes
                this.attendingMembers.forEach(member => {
                    for (let food = 0; food < member.wont_eat.length; food++){
                        if(this.dislikedFood.includes(member.wont_eat[food])) return;

                        this.dislikedFood.push(member.wont_eat[food]);
                    }

                    for (let drink = 0; drink < member.drinks.length; drink++){
                        if(this.likedDrink.includes(member.drinks[drink])) return;

                        this.likedDrink.push(member.drinks[drink]);
                    }
                });

                this.getVenues();
            }
        },
        methods: {
            addMember: function(i){
                this.attendingMembers.push(this.members[i]);
                this.members.splice(i, 1);
            },
            removeMember: function(i){
                this.members.push(this.attendingMembers[i]);
                this.attendingMembers.splice(i, 1);
            },
            resetValues: function(){
                this.suggestedVenues = [];
                this.likedDrink = [];
                this.dislikedFood = [];
            },
            getVenues: function(){
                let suggestions = [];

                // Suggest venues based on drinks
                this.venues.forEach(venue => {
                    if( venue.drinks.some(drink => this.likedDrink.includes(drink)) ){
                        suggestions.push(venue);
                    }
                });

                // Suggest venues based on drink + food preferences
                suggestions.forEach(venue => {
                    let passed = 0;

                    for(let f = 0; f < venue.food.length; f++){
                        if( !this.dislikedFood.includes(venue.food[f]) ) passed++;
                    }

                    if( passed > 0 ) this.suggestedVenues.push(venue.name);
                });
            }
        }
    }
</script>

<style scoped>
  .members {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
  }

  .members > div {
    flex: 1;
  }

  ul {
    padding-left: 0;
  }

  li {
    padding: 20px;
    list-style: none;
  }

  li:hover {
    background-color: rgba(200,200,200,1);
  }
</style>