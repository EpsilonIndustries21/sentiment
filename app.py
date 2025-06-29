from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import os

# Download required NLTK data
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

app = Flask(__name__)

# Load the trained model and vectorizer
def load_model():
    try:
        with open('trained_model.sav', 'rb') as model_file:
            model = pickle.load(model_file)
        with open('vectorizer.pkl', 'rb') as vectorizer_file:
            vectorizer = pickle.load(vectorizer_file)
        return model, vectorizer
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None

# Simple text cleaning function (minimal preprocessing)
def clean_text(text):
    """
    Minimal text cleaning that matches what the vectorizer expects.
    The TfidfVectorizer should handle most preprocessing internally.
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove extra whitespace
    text = ' '.join(text.split())
    
    return text

# Load model and vectorizer
model, vectorizer = load_model()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get text from request
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({
                'error': 'Please provide some text for analysis'
            }), 400
        
        # Clean the text (minimal preprocessing)
        cleaned_text = clean_text(text)
        
        # Vectorize the text using the fitted vectorizer
        # The vectorizer should handle tokenization, stopwords, etc. internally
        text_vectorized = vectorizer.transform([cleaned_text])
        
        # Make prediction
        prediction = model.predict(text_vectorized)[0]
        probabilities = model.predict_proba(text_vectorized)[0]
        
        # Get confidence scores
        positive_prob = probabilities[1] * 100
        negative_prob = probabilities[0] * 100
        
        # Determine sentiment
        sentiment = "Positive" if prediction == 1 else "Negative"
        confidence = max(positive_prob, negative_prob)
        
        return jsonify({
            'sentiment': sentiment,
            'confidence': round(confidence, 2),
            'probability_positive': round(positive_prob, 2),
            'probability_negative': round(negative_prob, 2),
            'original_text': text,
            'cleaned_text': cleaned_text
        })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            'error': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'vectorizer_loaded': vectorizer is not None,
        'model_type': str(type(model)) if model else None,
        'vectorizer_type': str(type(vectorizer)) if vectorizer else None
    })

if __name__ == '__main__':
    if model is None or vectorizer is None:
        print("Warning: Model or vectorizer could not be loaded!")
    else:
        print("Model and vectorizer loaded successfully!")
        print(f"Model type: {type(model)}")
        print(f"Vectorizer type: {type(vectorizer)}")
        if hasattr(vectorizer, 'vocabulary_'):
            print(f"Vocabulary size: {len(vectorizer.vocabulary_)}")
    
    app.run(debug=True, host='0.0.0.0', port=5001)