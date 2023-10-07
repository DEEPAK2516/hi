document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("github-form");
    const responseElement = document.getElementById("response");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const repository = document.getElementById("repository").value;
        const token = document.getElementById("token").value;
        const message = document.getElementById("message").value;

        const url = `https://api.github.com/repos/${username}/${repository}/issues`;
        const headers = {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
        };
        const data = {
            title: "Greetings",
            body: message,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });

            if (response.status === 201) {
                responseElement.textContent = "Message sent successfully!";
            } else {
                responseElement.textContent = `Failed to send message. Status code: ${response.status}`;
            }
        } catch (error) {
            console.error(error);
            responseElement.textContent = "An error occurred. Please try again.";
        }
    });
});
