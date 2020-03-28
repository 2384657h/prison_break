

function validatePassword(){
    var password = document.getElementById("inputPassword"), confirm_password = document.getElementById("inputConfirmPassword");
  if(password.value != confirm_password.value || password.value.length < 9) {
   confirm_password.setCustomValidity("Passwords don't match or length is not greater than 8 characters");
  }             
  else {
      confirm_password.setCustomValidity('');
  }


  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}

validatePassword()