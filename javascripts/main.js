requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery' : '../bower_components/jquery/dist/jquery.min',
    'firebase' : '../bower_components/firebase/firebase',
    'hbs' : '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap.min',
    'lodash' : '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["firebase", "jquery","lodash", "hbs", "bootstrap", "add", "remove"], 
  function(_firebase, $, _, Handlebars, bootstrap, add, remove) {
  var myFirebaseRef = new Firebase('https://dansfamily.firebaseio.com/');

  myFirebaseRef.child("family").on("value", function(snapshot) { 
    familyObj = snapshot.val();
  
    require(['hbs!../templates/main'], function(template) {
      var populatedTemplate = template(familyObj);
      $("#row").html(populatedTemplate);

      $(".btn").on("click", function(){
        console.log("Click");
        var deleteTitle = $(this).siblings('div.caption').children('h3').text();
        var objKey = _.findKey(familyObj, {'name': deleteTitle});
        console.log("objKey :", objKey);
        remove.remove(objKey);
      });

    });

    $("#submit").on("click", function(){
      var familyMember = {};
      familyMember.name = $("#name").val();
      familyMember.age = $("#age").val();
      familyMember.gender = $("#gender").val();
      skillsString = $("#skills").val();
      skillsString = skillsString.replace(/,/g, "");
      console.log("skillsString :", skillsString);
      var skillsArray = skillsString.split(" ");
      familyMember.skills = skillsArray;
      console.log("familyMember :", familyMember);
      add.add(familyMember);
      $("input").val('');
    });
  }); 
});  