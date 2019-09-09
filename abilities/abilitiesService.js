var app = angular.module("site");

app.service("AbilitiesService",
['CharCreatorService',
 function(CharCreatorService){

   this.priorityChange = priorityChange;
   this.selectAbility = selectAbility;
   this.getPriority = getPriority;
   this.getPriorityPts = getPriorityPts;
   this.resetAbilities = resetAbilities;
   this.resetPriorities = resetPriorities;
   this.setCustomAbility = setCustomAbility;
   this.abilityPriorities = ["Primary", "Secondary", "Tertiary"];
   this.abilitiesPage = "./abilities/abilities.html";
   this.abilityPtsTotal = 27;
   this.primaryPts = 13;
   this.secondaryPts = 9;
   this.tertiaryPts = 5;
   this.selectedPriorities = [null, null, null];
   this.abilitiesList = {};
   var vm = this;

   class Ability {
     constructor(name, id){
       this.name = name;
       if(id != null){
         this.id = id;
       }
       this.pointCount = 0;
       this.points = [{id: 0, img: "./empty.png", type: ""},
                      {id: 1, img: "./empty.png", type: ""},
                      {id: 2, img: "./empty.png", type: ""},
                      {id: 3, img: "./empty.png", type: ""},
                      {id: 4, img: "./empty.png", type: ""}];

       this.reset = function(){
         //Reset name for custom abilities on load, then load names if they exist.
         if(this.id != null){
           this.name = "";
         }
         this.points.forEach(function(ability){
           ability.img = './empty.png';
           ability.type = "";
         });
         this.pointCount = 0;
       };

       this.select = function(index){
         if(index == -1){
           this.reset();
           return;
         }
         if(this.points[index].img=="./full.png" ||
            this.points[index].img=="./free.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              return;
            }
            else{
              point.img = "./empty.png";
              point.type = "";
            }
          });
        }
        if(this.points[index].img == "./empty.png"){
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(CharCreatorService.freebieMode && point.img != "./full.png"){
                point.img = "./free.png";
                point.type = "freebie";
              }
              else{
                point.img = "./full.png";
                point.type = "original";
              }
            }
          });
        }
       };
     }
   };
   this.alertness = new Ability("Alertness");
   this.abilitiesList.alertness = this.alertness;
   this.athletics = new Ability("Athletics");
   this.abilitiesList.athletics = this.athletics;
   this.awareness = new Ability("Awareness");
   this.abilitiesList.awareness = this.awareness;
   this.brawl = new Ability("Brawl");
   this.abilitiesList.brawl = this.brawl;
   this.empathy = new Ability("Empathy");
   this.abilitiesList.empathy = this.empathy;
   this.expression = new Ability("Expression");
   this.abilitiesList.expression = this.expression;
   this.intimidation = new Ability("Intimidation");
   this.abilitiesList.intimidation = this.intimidation;
   this.leadership = new Ability("Leadership");
   this.abilitiesList.leadership = this.leadership;
   this.legerdemain = new Ability("Legerdemain");
   this.abilitiesList.legerdemain = this.legerdemain;
   this.subterfuge = new Ability("Subterfuge");
   this.abilitiesList.subterfuge = this.subterfuge;
   this.customtalent = new Ability('', 'customtalent');
   this.abilitiesList.customtalent = this.customtalent;
   this.animalken = new Ability("Animal Ken");
   this.abilitiesList.animalken = this.animalken;
   this.crafts = new Ability("Crafts");
   this.abilitiesList.crafts = this.crafts;
   this.archery = new Ability("Archery");
   this.abilitiesList.archery = this.archery;
   this.etiquette = new Ability("Etiquette");
   this.abilitiesList.etiquette = this.etiquette;
   this.commerce = new Ability("Commerce");
   this.abilitiesList.commerce = this.commerce;
   this.ride = new Ability("Ride");
   this.abilitiesList.ride = this.ride;
   this.melee = new Ability("Melee");
   this.abilitiesList.melee = this.melee;
   this.performance = new Ability("Performance");
   this.abilitiesList.performance = this.performance;
   this.stealth = new Ability("Stealth");
   this.abilitiesList.stealth = this.stealth;
   this.survival = new Ability("Survival");
   this.abilitiesList.survival = this.survival;
   this.customskill = new Ability('', 'customskill');
   this.abilitiesList.customskill = this.customskill;
   this.academics = new Ability("Academics");
   this.abilitiesList.academics = this.academics;
   this.enigmas = new Ability("Enigmas");
   this.abilitiesList.enigmas = this.enigmas;
   this.hearthwisdom = new Ability("HearthWisdom");
   this.abilitiesList.hearthwisdom = this.hearthwisdom;
   this.investigation = new Ability("Investigation");
   this.abilitiesList.investigation = this.investigation;
   this.law = new Ability("Law");
   this.abilitiesList.law = this.law;
   this.medicine = new Ability("Medicine");
   this.abilitiesList.medicine = this.medicine;
   this.occult = new Ability("Occult");
   this.abilitiesList.occult = this.occult;
   this.politics = new Ability("Politics");
   this.abilitiesList.politics = this.politics;
   this.seneschal = new Ability("Seneschal");
   this.abilitiesList.seneschal = this.seneschal;
   this.theology = new Ability("Theology");
   this.abilitiesList.theology = this.theology;
   this.customknowledge = new Ability('', 'customknowledge');
   this.abilitiesList.customknowledge = this.customknowledge;

   this.abilityCategories = [
     {
       id: 0, category: "talents", priority: null,
       abilities:
       [
         this.alertness, this.athletics, this.awareness, this.brawl,
         this.empathy, this.expression, this.intimidation, this.leadership,
         this.legerdemain, this.subterfuge, this.customtalent
       ]
    },
    {
      id: 1, category: "skills", priority: null,
      abilities:
      [
        this.animalken, this.crafts, this.archery, this.etiquette, this.commerce,
        this.ride, this.melee, this.performance, this.stealth, this.survival, this.customskill
      ]
    },
    {
      id: 2, category: "knowledges", priority: null,
      abilities:
      [
        this.academics, this.enigmas, this.hearthwisdom, this.investigation,
        this.law, this.medicine, this.occult, this.politics, this.seneschal,
        this.theology, this.customknowledge
      ]
    }];

    function getPriority(ability){
     for(var i = 0; i < this.abilityCategories.length; i++){
       if(this.abilityCategories[i].abilities.indexOf(ability)!=-1){
         return this.selectedPriorities[i];
       }
     }
    }

    function getPriorityPts(priority){
     switch(priority){
       case "Primary":
         return this.primaryPts;
         break;
       case "Secondary":
         return this.secondaryPts;
         break;
       case "Tertiary":
         return this.tertiaryPts;
         break;
       default:
         break;
     }
    };

    function selectAbility(ability, index){

      var priortyPts = 0;
      var pointDiff = 0;

      var priority = this.getPriority(ability);

      //Different operations if using Freebie points.
      if(CharCreatorService.freebieMode){

        if(ability.points[index].type == "original")
          return null;

        priorityPts = CharCreatorService.getFreebiePts();

        if(index < ability.pointCount - 1)
          pointDiff = (ability.pointCount * 2) - ((index + 1) * 2);
        if((index == ability.pointCount-1)){
          pointDiff = (ability.pointCount * 2) - (index * 2);
           index -= 1;
        }
        else if(index > ability.pointCount-1)
          pointDiff = ((ability.pointCount-1) * 2) + (-2 * index);

        if(priorityPts + pointDiff < 0)
          return null;

        CharCreatorService.changeFreebiePts(pointDiff);
        ability.pointCount = (index+1);
        ability.select(index);
        return;
      }
      else{
         priorityPts = this.getPriorityPts(priority);
         var pointDiff = ability.pointCount - (index+1);
      }

      if(priority==null || (!CharCreatorService.freebieMode && index >= 3)){
       return null;
      }

      //Do math to make sure they can't spend points they don't have,
      //even when priorityPts isn't equal to 0.
      //Case example: increase 3 pts when priorityPts = 2.
      if((priorityPts+pointDiff < 0)){
       return null;
      }

      if(index == 0 && ability.pointCount == 1){
        ability.pointCount = 0;
        pointDiff = 1;
        index = -1;
      }
      else{
        //Change the point count in the ability.
        ability.pointCount = (index+1);
      }


      //Change the total amount of points still available for that category.
      switch(priority){
       case "Primary":
         this.primaryPts += pointDiff;
         break;
       case "Secondary":
         this.secondaryPts += pointDiff;
         break;
       case "Tertiary":
         this.tertiaryPts += pointDiff;
         break;
       default:
         break;
      }
      this.abilityPtsTotal += pointDiff;
      //Fill in the dots!
      ability.select(index);
    };

    function priorityChange(changedPriority, id, prevPriority){
      this.abilityCategories[id].priority = changedPriority;
      for(var i = 0; i < this.selectedPriorities.length; i++){
        if(changedPriority == this.selectedPriorities[i] && id != i){
          this.selectedPriorities[i] = null;
          this.abilityCategories[i].abilities.forEach(function(abil){
            abil.reset();
          });
        }
      }
        //Reset the dots.
        this.abilityCategories[id].abilities.forEach(function(abil){
          abil.reset();

        });
        //Reset the point values.
        if(prevPriority == "Primary"){
          this.primaryPts = 13;
        }
        if(prevPriority == "Secondary"){
          this.secondaryPts  = 9;
        }
        if(prevPriority == "Tertiary"){
          this.tertiaryPts = 5;
        }
        if(changedPriority == "Primary"){
          this.primaryPts = 13;
        }
        if(changedPriority == "Secondary"){
          this.secondaryPts = 9;
        }
        if(changedPriority == "Tertiary"){
          this.tertiaryPts = 5;
        }
    };

    function resetAbilities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.abilities.forEach(function(ab){
          ab.reset();
        });
      });
    };

    function resetPriorities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.priority = null;
      });
      this.primaryPts = 13;
      this.secondaryPts = 9;
      this.tertiaryPts = 5;
    };

    function setCustomAbility(ability, name){
      if(ability == this.customtalent){
        this.customtalent.name = name;
      }
      else if(ability == this.customskill){
        this.customskill.name = name;
      }
      else{
        this.customknowledge.name = name;
      }
    };

}]);
