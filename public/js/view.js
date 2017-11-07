$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $cakeContainer = $(".cake-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteCake);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".cake-item", editCake);
  $(document).on("keyup", ".cake-item", finishEdit);
  $(document).on("blur", ".cake-item", cancelEdit);
  $(document).on("submit", "#cake-form", insertCake);

  // Our initial todos array
  var cakes = [];

  // Getting cakes from database when page loads
  getCakes();

  // This function resets the cakes displayed with new cakes from the database
  function initializeRows() {
    $cakeContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < cakes.length; i++) {
      rowsToAdd.push(createNewRow(cakes[i]));
    }
    $cakeContainer.prepend(rowsToAdd);
  }

  // This function grabs cakes from the database and updates the view
  function getCakes() {
    $.get("/api/cakes", function(data) {
      cakes = data;
      initializeRows();
    });
  }

  // Delete function for when the user clicks the delete button
  function deleteCake(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/cakes/" + id
    }).done(getCakes);
  }

  // This function handles showing the input box for a user to edit a cake
  function editCake() {
    var currentCake = $(this).data("cake");
    $(this).children().hide();
    $(this).children("input.edit").val(currentCake.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var cake = $(this).parent().data("cake");
    cake.complete = !cake.complete;
    updateCake(cake);
  }

  // This function starts updating a cake in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedCake = $(this).data("cake");
    if (event.keyCode === 13) {
      updatedCake.text = $(this).children("input").val().trim();
      $(this).blur();
      updateCake(updatedCake);
    }
  }

  // This function updates a todo in our database
  function updateCake(cake) {
    $.ajax({
      method: "PUT",
      url: "/api/cakes",
      data: cake
    }).done(getCakes);
  }

  // This function is called whenever a cake item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentCake = $(this).data("cake");
    if (currentCake) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentCake.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(cake) {
    var $newInputRow = $(
      [
        "<li class='list-group-item cake-item'>",
        "<span>",
        cake.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-success'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", cake.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("cake", cake);
    if (cake.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new cake into our database and then updates the view
  function insertCake(event) {
    event.preventDefault();
    var cake = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/cakes", cake, getCakes);
    $newItemInput.val("");
  }
});
