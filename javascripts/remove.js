define(["firebase"],function(_firebase) {
  return {
    remove: function(argument) {
      var ref = new Firebase("https://dansfamily.firebaseio.com/family/" + argument);
      ref.remove();
    }
  };
});