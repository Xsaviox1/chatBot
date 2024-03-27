const formPerguntaChat = document.getElementById('form-pergunta-chat');
const OPENAI_API_KEY = "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";


if (formPerguntaChat) {
    formPerguntaChat.addEventListener("submit", async (e) => {
        e.preventDefault();

        let $pergunta = document.getElementById('campo-pergunta').value;

        document.getElementById('pergunta').innerHTML = $pergunta;

        document.getElementById('btn-pergunta-chat').querySelector('span').innerText = "...";

        document.querySelector('textarea').value = "";

        const $lista = document.querySelector('.lista');
        $lista.insertAdjacentHTML('beforebegin', `<li class="pergunta">${$pergunta}</li>`)

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + OPENAI_API_KEY,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: $pergunta }],
                temperature: 0.5
            }),
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                document.getElementById('resposta').innerHTML = dados.choices[0].message.content;
                $respostaTexto = document.getElementById('resposta').innerHTML = dados.choices[0].message.content;
            })
            .catch((erro) => {
                console.log("Sem resposta...");
            });
            $lista.insertAdjacentHTML('beforebegin', `<li class="resposta">${$respostaTexto}</li>`)
            document.getElementById('btn-pergunta-chat').querySelector('span').innerText = "Enviar";
  
    });
}
