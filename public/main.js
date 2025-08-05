
// server calls


var parentPost = null;

$("#post-form").submit(function (e) {
    e.preventDefault();

    const formData = $(this).serialize(); // turn form data into URL-encoded string

    $.post("/add-post", formData, function (html) {
      $(".posts-list").append(html); // add returned post HTML
      $("#post-form")[0].reset();     // reset the form
      $("#post-form").css("display" , "none");
    });
});


$(document).on("click", ".delete-button", function() {
  $(this).closest(".post").remove();
});

$(document).on("click", ".edit-button", function () {
  // Prevent opening if create form is visible or if edit form is already open
  if ($("#post-form").is(":visible") || $("#edit-post-form").length > 0) {
    return;
  }

  parentPost = $(this).closest(".post");

  const postData = {
    author: parentPost.find(".author").text(),
    content: parentPost.find(".content").text()
  };

  $.post("/edit-post", postData, function (html) {
    $("body").append(html);
  });
});



$(document).on("submit", "#edit-post-form", function (e) {
  e.preventDefault();

  const formData = $(this).serialize(); // turn form data into URL-encoded string

  $.post("/post-edited", formData, function (html) {
    $("#edit-post-form")[0].reset();        // reset original add form
    $("#edit-post-form").remove();     // remove edit form from DOM
    $(parentPost).replaceWith(html);
  });
});

$(document).on("click", "#edit-post-cancel-button", function () {
  $("#edit-post-form").remove();
});

$(document).on("click", "#post-form-cancel-button", function () {
  $("#post-form").css("display" , "none")
  $("#post-form")[0].reset(); 
});

$(".creat-post-button").click(function () {
  // Prevent opening if edit form is open or if create form is already visible
  if ($("#edit-post-form").length > 0 || $("#post-form").is(":visible")) {
    return;
  }

  $("#post-form").css("display", "flex");
});




// functionality


