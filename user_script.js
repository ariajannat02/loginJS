document.addEventListener("DOMContentLoaded", function() {
    // Check if logged in
    const userName = localStorage.getItem("user_name");
    if (userName) {
        document.getElementById("user-name").textContent = userName;
        document.getElementById("user-greeting").textContent = "hi, ";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").addEventListener("click", function() {
            localStorage.removeItem("user_name");
            window.location.href = "logout_page.html";
        });
    } else {
        document.getElementById("login-btn").addEventListener("click", function() {
            window.location.href = "login_page.html";
        });
    }
});
