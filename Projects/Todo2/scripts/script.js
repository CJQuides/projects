function myFunction() {
  var x = document.getElementById("passwordTxtBx");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}