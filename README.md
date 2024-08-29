
# Full Stack Application

This project is a comprehensive full-stack application .

## 🚀 Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Spring Boot
- **Database**: MySQL
- **AI Chatbot**: Python 
- **AI API**: Gemini


## 🌐 Full Stack Setup

### Frontend (React.js & Tailwind CSS)

1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8000`.

### Database (MySQL)

1. Ensure MySQL is installed and running on your system.

2. Update the `application.properties` file in the Spring Boot project with your MySQL credentials and database name.

## 🤖 AI Chatbot Setup (zBOT)

The AI chatbot, known as zBOT, is a Python-based component integrated into the main application. It utilizes a feed-forward neural network with two hidden layers for deep learning capabilities. Key preprocessing steps include tokenization, lemmatization, and spell correction to ensure effective text processing. Follow these steps to set it up

1. Create a virtual environment:
   ```bash
   cd zBOT
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

2. Install dependencies:
   ```bash
   pip install Flask torch torchvision nltk
   ```

3. Install NLTK package:
   ```bash
   python
   >>> import nltk
   >>> nltk.download('punkt')
   >>> exit()
   ```

4. Customize the `intents.json` file to define chatbot intents and responses.

5. Train the model:
   ```bash
   python train.py
   ```

6. Test the chatbot:
   ```bash
   python chat.py
   ```

## 🩺 Disease Diagnosis with Gemini AI

We have integrated the Gemini AI API into our application to provide disease diagnosis capabilities. The AI can suggest the appropriate department for a patient based on their symptoms.

1. Create a virtual environment:
   ```bash
   cd GeminiAiApi
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

2. Install dependencies:
   ```bash
   pip install Flask google-generativeai
   ```
3. Set up the Flask API to interact with Gemini AI:
   ```bash
   python DiagnoseDisease.py
   ```



## 📚 Usage

1. Start the backend server and ensure the database is running.
2. Launch the frontend application.
3. Access the application through your web browser at `http://localhost:3000`.
4. The AI chatbot can be interacted with through the designated chat interface in the application.

## 🔧 Configuration

- Frontend: Modify the `.env` file in the frontend directory to set any necessary environment variables.
- Backend: Update `application.properties` or `application.yml` in the Spring Boot project to configure database connections and other settings.
- Chatbot: Adjust the `intents.json` file to customize the chatbot's responses and capabilities.



## 🤝 Contributors
1. Diptajoy Mistry
2. Rasel Hossen




