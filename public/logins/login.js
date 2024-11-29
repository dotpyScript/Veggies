// Toggle shadow effect on the login button
$("#login-btn")
  .click(function () {
    $(this).addClass("btn-shadow");
  })
  .mouseout(function () {
    $(this).removeClass("btn-shadow");
  });

// Toggle between Register and Login
function myfunction(isinya) {
  if (isinya === "register") {
    $("#loginbtn").removeClass("active");
    $("#registerbtn").addClass("active");

    // Show the Register section and set its text color
    $("#login").css({ display: "none" });
    $("#register").css({ display: "block", color: "#1bf025" });
  } else {
    $("#registerbtn").removeClass("active");
    $("#loginbtn").addClass("active");

    // Show the Login section with default text color
    $("#register").css({ display: "none" });
    $("#login").css({ display: "block", color: "" });
  }
}

document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "index.html";
});
