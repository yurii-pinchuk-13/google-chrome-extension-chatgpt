const API_KEY = 'YOUR API KEY';

document.addEventListener('DOMContentLoaded', async () => {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        chatOutput.innerHTML += `<p class="user-message">${message}</p>`;
        chatInput.value = "";
        chatOutput.scrollTop = chatOutput.scrollHeight;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + API_KEY,
            },
            body: JSON.stringify(
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": message}],
                    "temperature": 0.7
                }
            ),
        });

        if (response.ok) {
            const data = await response.json();
            
            if (data?.choices[0]?.message?.content) {
                chatOutput.innerHTML += `<p class="bot-message">${data.choices[0].message.content}</p>`;
            } else {
                console.error("Error: Unexpected response format", data);
            }

            chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
            console.error("Error communicating with GPTChat API");
        }
    });
});
