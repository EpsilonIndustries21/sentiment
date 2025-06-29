// DOM Elements
const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const loadingSection = document.getElementById('loading-section');
const resultsSection = document.getElementById('results-section');
const errorSection = document.getElementById('error-section');

// Results elements
const sentimentIcon = document.getElementById('sentiment-icon');
const sentimentText = document.getElementById('sentiment-text');
const confidenceText = document.getElementById('confidence-text');
const positiveBar = document.getElementById('positive-bar');
const negativeBar = document.getElementById('negative-bar');
const positivePercentage = document.getElementById('positive-percentage');
const negativePercentage = document.getElementById('negative-percentage');
const originalText = document.getElementById('original-text');

// Error elements
const errorTitle = document.getElementById('error-title');
const errorMessage = document.getElementById('error-message');

// State management
let isAnalyzing = false;

// Event Listeners
analyzeBtn.addEventListener('click', handleAnalyze);
clearBtn.addEventListener('click', handleClear);
textInput.addEventListener('keydown', handleKeyDown);

// Handle Enter key in textarea
function handleKeyDown(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        handleAnalyze();
    }
}

// Main analyze function
async function handleAnalyze() {
    const text = textInput.value.trim();

    if (!text) {
        showError('Please enter some text to analyze');
        return;
    }

    if (isAnalyzing) {
        return;
    }

    isAnalyzing = true;

    // Show loading state
    showLoading();

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to analyze text');
        }

        // Display results
        displayResults(data);

    } catch (error) {
        console.error('Analysis error:', error);
        showError(error.message || 'Failed to analyze text. Please try again.');
    } finally {
        isAnalyzing = false;
    }
}

// Display analysis results
function displayResults(data) {
    // Hide loading and error sections
    hideLoading();
    hideError();

    // Update sentiment display
    updateSentimentDisplay(data.sentiment, data.confidence);

    // Update confidence bars with animation
    animateConfidenceBars(data.probability_positive, data.probability_negative);

    // Update original text
    originalText.textContent = data.original_text;

    // Show results section
    resultsSection.classList.remove('hidden');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Update sentiment display
function updateSentimentDisplay(sentiment, confidence) {
    const isPositive = sentiment.toLowerCase() === 'positive';

    // Update icon
    sentimentIcon.className = 'sentiment-icon ' + (isPositive ? 'positive' : 'negative');
    sentimentIcon.innerHTML = isPositive ? '<i class="fas fa-smile"></i>' : '<i class="fas fa-frown"></i>';

    // Update text
    sentimentText.textContent = sentiment;
    confidenceText.textContent = `Confidence: ${confidence}%`;
}

// Animate confidence bars
function animateConfidenceBars(positiveProb, negativeProb) {
    // Reset bars
    positiveBar.style.width = '0%';
    negativeBar.style.width = '0%';
    positivePercentage.textContent = '0%';
    negativePercentage.textContent = '0%';

    // Animate after a short delay
    setTimeout(() => {
        positiveBar.style.width = `${positiveProb}%`;
        negativeBar.style.width = `${negativeProb}%`;
        positivePercentage.textContent = `${positiveProb}%`;
        negativePercentage.textContent = `${negativeProb}%`;
    }, 100);
}

// Show loading state
function showLoading() {
    hideError();
    hideResults();
    loadingSection.classList.remove('hidden');
}

// Hide loading state
function hideLoading() {
    loadingSection.classList.add('hidden');
}

// Show error
function showError(message) {
    hideLoading();
    hideResults();
    errorTitle.textContent = 'Error';
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}

// Hide error
function hideError() {
    errorSection.classList.add('hidden');
}

// Hide results
function hideResults() {
    resultsSection.classList.add('hidden');
}

// Clear function
function handleClear() {
    textInput.value = '';
    hideLoading();
    hideError();
    hideResults();
    textInput.focus();
}

// Auto-resize textarea
textInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 300) + 'px';
});

// Add some example texts for testing
function addExampleTexts() {
    const examples = [
        "I absolutely love this product! It's amazing and works perfectly.",
        "This is the worst experience I've ever had. Terrible service!",
        "The movie was okay, nothing special but not bad either.",
        "Fantastic customer support! They resolved my issue quickly and professionally.",
        "I'm so disappointed with the quality. Waste of money."
    ];

    // Add a small helper text below the textarea
    const helperText = document.createElement('div');
    helperText.className = 'helper-text';
    helperText.innerHTML = `
        <small style="color: #666; font-size: 0.9rem;">
            <strong>Try these examples:</strong> 
            ${examples.map((ex, i) => `<a href="#" onclick="setExample(${i})" style="color: #667eea; text-decoration: none; margin-right: 10px;">Example ${i + 1}</a>`).join('')}
        </small>
    `;

    textInput.parentNode.insertBefore(helperText, textInput.nextSibling);

    // Add global function for examples
    window.setExample = function (index) {
        textInput.value = examples[index];
        textInput.style.height = 'auto';
        textInput.style.height = Math.min(textInput.scrollHeight, 300) + 'px';
    };
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Add example texts
    addExampleTexts();

    // Focus on text input
    textInput.focus();

    // Add some visual feedback for button states
    analyzeBtn.addEventListener('mouseenter', function () {
        if (!isAnalyzing) {
            this.style.transform = 'translateY(-2px)';
        }
    });

    analyzeBtn.addEventListener('mouseleave', function () {
        if (!isAnalyzing) {
            this.style.transform = 'translateY(0)';
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function (event) {
        // Ctrl/Cmd + Enter to analyze
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            handleAnalyze();
        }

        // Escape to clear
        if (event.key === 'Escape') {
            handleClear();
        }
    });
});

// Add some nice animations for better UX
function addAnimations() {
    // Add fade-in animation for sections
    const sections = document.querySelectorAll('.input-section, .results-section, .loading-section, .error-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', addAnimations); 