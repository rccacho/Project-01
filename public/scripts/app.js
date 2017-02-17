console.log("sanity check: JS connected!");

  $(document).ready(function(){

    var $mainDiv = $('.container.main-content');

    //After button is clicked, the page clears and loads a question
    var takeQuiz = $('button');
    takeQuiz.click(function(event){
      clearPage();
      loadQuestion();
    });

  //Function to clear the page
  function clearPage(){
    $mainDiv.empty();
  }

  //Appends the result and form to the page
  function loadCreaturePage(){
    $mainDiv.append(`
      <div class="creature">
        <img src='https://i.ytimg.com/vi/j-CtdZVZbcI/maxresdefault.jpg'>
        <h1>You are a HOBBIT!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras malesuada erat diam, et scelerisque massa tincidunt quis. Nulla finibus convallis sem eget ornare. Fusce aliquet massa at quam tincidunt ultricies. Morbi tristique, lectus in ultrices ultricies, lacus felis semper erat, id euismod urna enim sit amet augue. Etiam tincidunt imperdiet ipsum ut maximus. Curabitur at risus vulputate nisl sollicitudin consectetur vel quis nulla.</p>
      </div>
      <div class="userData">
        <form>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Name</label></div><div class="col-md-3"><input type="text" name="name" required></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>City</label></div><div class="col-md-3"><input type="text" name="city" required></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Age</label></div><div class="col-md-3"><input type="text" name="age" required></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Gender</label></div><div class="col-md-3"><input type="radio" value="male" name="gender" required>Male <input type="radio" value="female" name="gender">Female</div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Favorite Color</label></div><div class="col-md-3"><input type="text" name="favoriteColor" required></div>
          </div>
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><label>Favorite Food</label></div><div class="col-md-3"><input type="text" name="favoriteFood" required></div>
          </div>
          <input type="hidden" name="creature" value="Hobbit">
          <div class="row">
            <div class="col-md-offset-3 col-md-3"><input type="submit"></div>
          </div>
        </form>
      </div>
      `);

      var $form = $('form');
      $form.on('submit', function(event){
        event.preventDefault();
        $.ajax({
          method: 'POST',
          url: '/api/users',
          data: $form.serialize(),
          success: loadProfile,
          error: onError
        });
      });
  }

  function onError(xhr, ajaxOptions, thrownError){
    console.log(xhr);
    console.log(ajaxOptions);
    console.log(thrownError);
  }

  function loadProfile(newUser){
    $('.userData').empty();
    $('.userData').append(`<p>${newUser.name}</p>`);
  }

  
	//GETS ALL User profiles and renders to page
	$.ajax({
      method: 'GET',
      url: '/api/users',
      success: renderMultipleUsers,
      error: onError
  	});

  function renderMultipleUsers(users) {
  	users.forEach(function(user) {
      renderUser(user);
    });
  }

  function renderUser(user) {
  	console.log('rendering user', user);
  }



  //Appends the question and answer choices to the page
  function loadQuestion(){
    $mainDiv.append(`

      <h1>Which creature are you?</h1>
      <div class="row">
        <div class="option col-md-6">Hooman</div>
        <div class="option col-md-6">Hobbit</div>
      </div>

    `);
    $('.option').click(function(){
      clearPage();
      loadCreaturePage();
    })
  }

});
