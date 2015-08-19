define(function() {
  return {
    add: function(argument) {
      $.ajax({
			  url: "https://dansfamily.firebaseio.com/family.json",
			  method: "POST",
			  data: JSON.stringify(argument)
		  });
    }
  };
});