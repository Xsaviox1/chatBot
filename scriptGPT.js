const formPerguntaChat = document.getElementById('form-pergunta-chat');
const OPENAI_API_KEY = "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";

let historicoConversa = [];

if (formPerguntaChat) {
    formPerguntaChat.addEventListener("submit", async (e) => {
        e.preventDefault();

        let pergunta = document.getElementById('campo-pergunta').value;

        // Adicionar mensagem atual ao histórico da conversa
        historicoConversa.push({ role: "user", content: pergunta });

        // Limpar campo de pergunta
        document.querySelector('textarea').value = "";

        // Exibir pergunta na lista
        const lista = document.querySelector('.lista');
        lista.insertAdjacentHTML('beforeend', `<li class="pergunta">${pergunta}</li>`);

        // Alterar texto do botão
        document.getElementById('btn-pergunta-chat').querySelector('span').innerText = "...";

        try {
            // Enviar histórico da conversa para a API
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + OPENAI_API_KEY,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: historicoConversa, // Enviar histórico da conversa para a API
                    temperature: 0.7
                }),
            });

            // Processar resposta da API
            const dados = await response.json();
            const respostaTexto = dados.choices[0].message.content;

            // Adicionar resposta ao histórico da conversa
            historicoConversa.push({ role: "assistant", content: respostaTexto });

            // Exibir resposta na lista
            lista.insertAdjacentHTML('beforeend', `<li class="resposta">${respostaTexto}</li>`);

        } catch (error) {
            console.log("Erro ao enviar pergunta:", error);
        }

        // Restaurar texto do botão
        document.getElementById('btn-pergunta-chat').querySelector('span').innerText = "Enviar";
    });
}
