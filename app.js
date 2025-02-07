document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const resultSection = document.getElementById('result-section');
    const predictionResult = document.getElementById('prediction-result');
    const feedbackButton = document.getElementById('submit-feedback');
    const feedbackText = document.getElementById('feedback');
    
    // API endpoint and key
    const apiUrl = 'https://api.openai.com/v1/completions';
    const apiKey = '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';

    // Event listener for the form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent default form submission behavior

        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;

        // Show loading state (could be a spinner)
        predictionResult.textContent = 'Loading prediction...';

        // API request
        const prediction = await getPrediction(name, birthdate);

        // Display prediction result
        predictionResult.textContent = prediction;
        resultSection.style.display = 'block';
    });

    // Function to interact with the API and fetch predictions
    async function getPrediction(name, birthdate) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: `Give me a numerology-based prediction for a person named ${name}, born on ${birthdate}. What are their future opportunities and life path?`,
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        const data = await response.json();
        return data.choices[0].text.trim();  // Assuming the prediction is in the 'choices' array
    }

    // Feedback submission logic
    feedbackButton.addEventListener('click', () => {
        const feedback = feedbackText.value;
        
        if (feedback) {
            alert('Thank you for your feedback!');
            feedbackText.value = '';  // Clear the feedback area
        } else {
            alert('Please provide some feedback before submitting.');
        }
    });
});