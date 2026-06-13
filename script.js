const chatBox = document.getElementById("chat-box");

function addMessage(text, sender){

    const div = document.createElement("div");

    div.className = sender === "user"
        ? "user-message"
        : "bot-message";

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage(){

    const input = document.getElementById("userInput");

    const message = input.value.trim();

    if(message === "") return;

    addMessage(message, "user");

    input.value = "";

    try{

        const response = await fetch("URL_DE_TU_API", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "TU_API_KEY",
                "X-RapidAPI-Host": "TU_HOST"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        addMessage(data.response, "bot");

    }catch(error){

        addMessage(
            "Lo siento, no he podido procesar tu consulta.",
            "bot"
        );

        console.error(error);
    }
}
