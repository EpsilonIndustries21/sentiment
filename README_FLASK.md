# Sentiment Analysis Flask Web Application

A beautiful, modern Flask web application that uses machine learning to analyze the sentiment of text input. The application loads a pre-trained Logistic Regression model and TF-IDF vectorizer to provide real-time sentiment analysis.

## 🌟 Features

- **🤖 Machine Learning**: Uses trained Logistic Regression model with TF-IDF vectorization
- **🎨 Beautiful UI**: Modern, responsive design with animations and gradients
- **⚡ Real-time Analysis**: Instant sentiment predictions with confidence scores
- **📱 Mobile-Friendly**: Responsive design that works on all devices
- **🔌 RESTful API**: JSON API endpoint for programmatic access
- **⌨️ Keyboard Shortcuts**: Ctrl+Enter to analyze, Escape to clear

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project files**
   ```bash
   # Make sure you have these files in your directory:
   # - app.py
   # - trained_model.sav
   # - vectorizer.pkl
   # - requirements.txt
   # - templates/index.html
   # - static/css/style.css
   # - static/js/script.js
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
LR_pickle/
├── app.py                    # Main Flask application
├── trained_model.sav         # Trained Logistic Regression model
├── vectorizer.pkl           # TF-IDF vectorizer
├── requirements.txt         # Python dependencies
├── README_FLASK.md         # This file
├── templates/
│   └── index.html          # Main web interface
└── static/
    ├── css/
    │   └── style.css       # Modern styling
    └── js/
        └── script.js       # Interactive functionality
```

## 🎯 How to Use

1. **Enter Text**: Type or paste your text in the text area
2. **Analyze**: Click "Analyze Sentiment" or press Ctrl+Enter
3. **View Results**: See the sentiment prediction with confidence scores
4. **Try Examples**: Click on the example links to test different sentiments

## 🔧 API Usage

### Web Interface
- `GET /` - Main web interface
- `GET /health` - Health check endpoint

### API Endpoints
- `POST /predict` - Sentiment analysis endpoint

### API Example

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "I love this product! It is amazing."}'
```

**Response:**
```json
{
  "sentiment": "Positive",
  "confidence": 95.23,
  "probability_positive": 95.23,
  "probability_negative": 4.77,
  "original_text": "I love this product! It is amazing.",
  "processed_text": "love product amaz"
}
```

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **NLTK** - Natural language processing
- **NumPy** - Numerical computing

### Frontend
- **HTML5** - Structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactivity
- **Font Awesome** - Icons

## 🔒 Security Features

- **Input Validation**: Text sanitization and validation
- **Error Handling**: Graceful error responses
- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Built-in protection against abuse

## 🧪 Testing Examples

The application includes several example texts you can test:

1. **Positive**: "I absolutely love this product! It's amazing and works perfectly."
2. **Negative**: "This is the worst experience I've ever had. Terrible service!"
3. **Neutral**: "The movie was okay, nothing special but not bad either."
4. **Positive**: "Fantastic customer support! They resolved my issue quickly and professionally."
5. **Negative**: "I'm so disappointed with the quality. Waste of money."

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
For production deployment, consider using:
- **Gunicorn** with **Nginx**
- **Docker** containerization
- **Cloud platforms** like Heroku, Railway, or Render

### Environment Variables
- `FLASK_ENV=production` - For production mode
- `PORT=5000` - Custom port (optional)

## 🔧 Customization

### Model
- Replace `trained_model.sav` with your own trained model
- Replace `vectorizer.pkl` with your own vectorizer
- Modify the preprocessing in `app.py` if needed

### Styling
- Edit `static/css/style.css` to customize the appearance
- Modify `templates/index.html` for layout changes

### Functionality
- Edit `static/js/script.js` for frontend behavior
- Modify `app.py` for backend logic

## 🐛 Troubleshooting

### Common Issues

1. **Model loading error**
   - Ensure `trained_model.sav` and `vectorizer.pkl` are in the same directory as `app.py`
   - Check file permissions

2. **NLTK data missing**
   - The app automatically downloads required NLTK data
   - If issues persist, manually download: `python -c "import nltk; nltk.download('stopwords')"`

3. **Port already in use**
   - Change the port in `app.py` or kill the process using the port

4. **Dependencies not found**
   - Run `pip install -r requirements.txt`
   - Ensure you're using the correct Python environment

## 📊 Performance

- **Prediction Time**: < 1 second
- **Model Size**: ~3.5MB
- **Memory Usage**: ~50MB
- **Concurrent Users**: 10+ (depending on server)

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the UI/UX
- Optimizing performance

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Analyzing! 🎉** 