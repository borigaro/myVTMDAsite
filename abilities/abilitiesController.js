var app = angular.module("site");

app.controller("AbilitiesController",
['$scope','NgTableParams','AbilitiesService',
 function($scope, NgTableParams, AbilitiesService){

  this.priorityChange = priorityChange;
  this.selectAbility = selectAbility;
  this.getPriorityPts = getPriorityPts;
  this.setCustomAbility = setCustomAbility;

  this.abilityPriorities = getAbilityPriorities();
  function getAbilityPriorities(){
    return AbilitiesService.abilityPriorities;
  };

  this.abilitiesPage = getAbilitiesPage();
  function getAbilitiesPage(){
    return AbilitiesService.abilitiesPage;
  };

  this.selectedPriorities = getSelectedPriorities();
  function getSelectedPriorities(){
    return AbilitiesService.selectedPriorities;
  };

  this.alertness =  AbilitiesService.alertness;
  this.athletics = AbilitiesService.athletics;
  this.awareness = AbilitiesService.awareness;
  this.brawl = AbilitiesService.brawl;
  this.empathy = AbilitiesService.empathy;
  this.expression = AbilitiesService.expression;
  this.intimidation = AbilitiesService.intimidation;
  this.leadership = AbilitiesService.leadership;
  this.legerdemain = AbilitiesService.legerdemain;
  this.subterfuge = AbilitiesService.subterfuge;
  this.animalken = AbilitiesService.animalken;
  this.crafts = AbilitiesService.crafts;
  this.archery = AbilitiesService.archery;
  this.etiquette = AbilitiesService.etiquette;
  this.commerce = AbilitiesService.commerce;
  this.ride = AbilitiesService.ride;
  this.melee = AbilitiesService.melee;
  this.performance = AbilitiesService.performance;
  this.stealth = AbilitiesService.stealth;
  this.survival = AbilitiesService.survival;
  this.academics = AbilitiesService.academics;
  this.enigmas = AbilitiesService.enigmas;
  this.hearthwisdom = AbilitiesService.hearthwisdom;
  this.investigation = AbilitiesService.investigation;
  this.law = AbilitiesService.law;
  this.medicine = AbilitiesService.medicine;
  this.occult = AbilitiesService.occult;
  this.politics = AbilitiesService.politics;
  this.seneschal = AbilitiesService.seneschal;
  this.theology = AbilitiesService.theology;
  this.customtalent = AbilitiesService.customtalent;
  this.customskill = AbilitiesService.customskill;
  this.customknowledge = AbilitiesService.customknowledge;

  this.abilityCategories = getAbilityCategories();
  function getAbilityCategories(){
    return AbilitiesService.abilityCategories;
  };

  function getPriorityPts(index){
    return AbilitiesService.getPriorityPts(index);
  };

  function selectAbility(ability, index){
    AbilitiesService.selectAbility(ability, index);
  };

  function priorityChange(changedPriority, id, prevPriority){
    AbilitiesService.priorityChange(changedPriority, id, prevPriority);
  };

  function setCustomAbility(ability, name){
    AbilitiesService.setCustomAbility(ability, name);
  }

  var self = this;
  $scope.$on('loadCharacter', function(){
    self.selectedPriorities = getSelectedPriorities();
    self.alertness =  AbilitiesService.alertness;
    self.athletics = AbilitiesService.athletics;
    self.awareness = AbilitiesService.awareness;
    self.brawl = AbilitiesService.brawl;
    self.empathy = AbilitiesService.empathy;
    self.expression = AbilitiesService.expression;
    self.intimidation = AbilitiesService.intimidation;
    self.leadership = AbilitiesService.leadership;
    self.legerdemain = AbilitiesService.legerdemain;
    self.subterfuge = AbilitiesService.subterfuge;
    self.animalken = AbilitiesService.animalken;
    self.crafts = AbilitiesService.crafts;
    self.archery = AbilitiesService.archery;
    self.etiquette = AbilitiesService.etiquette;
    self.commerce = AbilitiesService.commerce;
    self.ride = AbilitiesService.ride;
    self.melee = AbilitiesService.melee;
    self.performance = AbilitiesService.performance;
    self.stealth = AbilitiesService.stealth;
    self.survival = AbilitiesService.survival;
    self.academics = AbilitiesService.academics;
    self.enigmas = AbilitiesService.enigmas;
    self.hearthwisdom = AbilitiesService.hearthwisdom;
    self.investigation = AbilitiesService.investigation;
    self.law = AbilitiesService.law;
    self.medicine = AbilitiesService.medicine;
    self.occult = AbilitiesService.occult;
    self.politics = AbilitiesService.politics;
    self.seneschal = AbilitiesService.seneschal;
    self.theology = AbilitiesService.theology;
    self.customtalent = AbilitiesService.customtalent;
    self.customskill = AbilitiesService.customskill;
    self.customknowledge = AbilitiesService.customknowledge;
    $scope.$apply();
  });

  $scope.$on('resetCharacter', function(){
    AbilitiesService.resetAbilities();
    AbilitiesService.resetPriorities();
  });


  this.dataSet = function(){
    var data = [];
    for(var i = 0; i < this.abilityCategories[0].abilities.length; i++){
      data.push({col1: this.abilityCategories[0].abilities[i],
                 col2: this.abilityCategories[1].abilities[i],
                 col3: this.abilityCategories[2].abilities[i] });
    }
    return data;
  }
  this.tableParams1 = new NgTableParams({count: this.abilityCategories[0].abilities.length},
                      { dataset: this.dataSet(), counts: [] });
}]);
