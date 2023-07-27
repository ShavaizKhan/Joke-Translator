// script.js

// Fetch a random joke from the JokeAPI
async function fetchJoke() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();

        if (data.type === 'single') {
            return data.joke;
        } else if (data.type === 'twopart') {
            return `${data.setup} ${data.delivery}`;
        }

        return 'No joke found';
    } catch (error) {
        console.error('Error fetching joke:', error);
        return 'Failed to fetch joke';
    }
}

// Translate a text using Mymemory Translation API
async function translateText(text, targetLanguage) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`
        });
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return 'Translation failed';
    }
}

// Update the joke container with the untranslated joke
async function updateJoke() {
    const jokeContainer = document.getElementById('joke-container');
    jokeContainer.innerHTML = '<p>Loading joke...</p>';

    try {
        const joke = await fetchJoke();
        jokeContainer.innerHTML = `<p>${joke}</p>`;
    } catch (error) {
        jokeContainer.innerHTML = '<p>Error fetching joke</p>';
    }
}

// Event listeners
document.getElementById('translate-btn').addEventListener('click', async () => {
    const jokeContainer = document.getElementById('joke-container');
    const selectedLanguage = document.getElementById('language-select').value;
    const jokeText = jokeContainer.innerText;
    
    try {
        const translatedJoke = await translateText(jokeText, selectedLanguage);
        jokeContainer.innerHTML += `<p class="translated">${translatedJoke}</p>`;
    } catch (error) {
        jokeContainer.innerHTML += '<p class="translated">Translation failed</p>';
    }
});

document.getElementById('refresh-btn').addEventListener('click', updateJoke);

// Initial joke load
updateJoke();

