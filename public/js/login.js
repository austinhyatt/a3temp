document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop form from submitting automatically

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        const data = JSON.stringify({
            username: username,
            password: password
        });

        try {
            console.log("Submitting login request...");

            localStorage.setItem("user", username);
            console.log("LocalStorage user:", localStorage.getItem("user"));

            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: data,
            });

            if (response.redirected) {
                window.location.href = response.url; // Redirect on success/failure
            } else {
                const result = await response.text();
                alert(result); // Show server response if not redirected
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
