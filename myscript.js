document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>');
document.write('<script src="//cdn.firebase.com/js/client/2.2.1/firebase.js"></script>');
document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.0/moment.min.js"></script>');
document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.1.0/js/md5.js"></script>');

$(function() {
  var ref = new Firebase("https://sieutv-comment.firebaseio.com/"),
    postRef = ref.child(slugify(window.location.pathname));

    postRef.on("child_added", function(snapshot) {
      var newPost = snapshot.val();
      $(".comments").prepend('<div class="comment">' +
        '<h4>' + newPost.name + '</h4>' +
        '<div class="profile-image"><img src="http://www.gravatar.com/avatar/' + newPost.md5Email + '?s=100&d=retro"/></div> ' +
        '<span class="date">' + moment(newPost.postedAt).fromNow() + '</span><p>' + newPost.message  + '</p></div>');
    });

    $("#comment").submit(function() {
      postRef.push().set({
        name: $("#name").val(),
        message: $("#message").val(),
        md5Email: md5($("#email").val()),
        postedAt: Firebase.ServerValue.TIMESTAMP
      });

      $("input[type=text], textarea").val("");
      return false;
    });
});

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-')
    .replace(/[^a-zA-Z0-9-_]+/g,'');
}
