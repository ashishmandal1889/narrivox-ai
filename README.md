# 🎬 Narrivox AI — AI-Powered YouTube Script Generator

**Turn your video ideas into engaging, structured YouTube scripts with AI.**

Narrivox AI is an AI-powered web application that helps content creators generate structured YouTube video scripts based on their topic, target audience, preferred tone, video duration, and content objectives.

It also supports AI-generated thumbnail images, user authentication, and saved script management.

Live Application: https://narrivox-ai.vercel.app/

Source Code: https://github.com/ashishmandal1889/narrivox-ai

---

## 🚀 Features

### ✍️ AI Script Generation
- Generate YouTube scripts from a video topic.
- Customize scripts based on your target audience.
- Select a preferred writing tone.
- Specify the target video duration.
- Add video objectives and important key points.
- Include a custom call to action.
- Generate structured scripts optimized for viewer engagement.

### 🖼️ AI Thumbnail Generation
- Generate thumbnail images using AI.
- Create thumbnail concepts based on the video topic and script.
- Use a dedicated image-generation model.

### 🔐 User Authentication
- User registration and login.
- Secure password hashing.
- Session-based authentication.
- Protected API endpoints.
- User-specific script management.

### 📚 Script Management
- Save generated scripts.
- View previously generated scripts.
- Retrieve saved scripts after login.
- Delete scripts when they are no longer needed.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Backend | Node.js |
| Server Framework | Express.js |
| Frontend | HTML, CSS, JavaScript |
| AI Script Generation | OpenRouter API |
| Default Text Model | OpenAI GPT-4o-mini |
| AI Thumbnail Generation | Hugging Face Inference API |
| Default Image Model | FLUX.1-schnell |
| Database | MongoDB |
| Local Storage Fallback | JSON file |
| Authentication | Custom session-based authentication |
| Password Security | Node.js Crypto (scrypt) |
| Testing | Node.js test setup |
| Deployment Configuration | Vercel configuration |

---

## ⚙️ How It Works

1. Create an account or log in.
2. Enter your YouTube video topic.
3. Select your target audience, tone, and video duration.
4. Optionally provide the video objective, key points, and call to action.
5. Generate your script using AI.
6. Generate a thumbnail based on your video topic.
7. Save and manage your generated scripts.

---

## 🏗️ Project Structure

```text
narrivox-ai/
│
├── api/
├── assets/
├── client/
├── data/
├── public/
├── src/
│   ├── auth.js
│   └── database.js
│
├── tests/
│   └── server.test.js
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── server.js
├── stack.css
├── stack.html
├── styles.css
├── vercel.json
└── README.md
```

---

## 💻 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ashishmandal1889/narrivox-ai.git
```

### 2. Navigate to the Project

```bash
cd narrivox-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

You can use `.env.example` as your reference.

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini

HF_TOKEN=your_huggingface_token
HF_IMAGE_MODEL=black-forest-labs/FLUX.1-schnell

MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=narrivox_ai
```

**API credentials:**

- OpenRouter API: https://openrouter.ai/
- Hugging Face: https://huggingface.co/settings/tokens
- MongoDB Atlas: https://www.mongodb.com/products/platform/atlas-database

Never upload your actual `.env` file or API keys to GitHub.

### 5. Run the Application

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

---

## 🗄️ Database Configuration

Narrivox AI supports MongoDB for persistent data storage.

Configure these environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=narrivox_ai
```

The application also includes a local JSON-file database fallback when MongoDB is not configured.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/session` | Retrieve the current session |
| POST | `/api/auth/logout` | Log out |
| POST | `/api/generate-script` | Generate a YouTube script |
| POST | `/api/generate-thumbnail` | Generate a thumbnail |
| POST | `/api/delete-script` | Delete a saved script |

Protected endpoints require a valid bearer token.

---

## 🧪 Testing

Run the project's test command:

```bash
npm test
```

## 🏗️ Build

Build the client application using:

```bash
npm run build
```

---

## 🔒 Security

- Passwords are hashed using Node.js `scrypt`.
- Authentication uses session tokens.
- Protected routes require authentication.
- API credentials are managed through environment variables.
- User-specific script access is enforced by the backend.

---

## 🎯 Project Goals

Narrivox AI aims to simplify the content creation process by combining generative AI with practical tools for YouTube creators.

The project explores how AI can help creators move from an initial idea to a structured video script and thumbnail concept.

---

## 👨‍💻 Author

**Ashish Kumar**

Computer Science Engineering Student | Full Stack Development | AI/ML Enthusiast


---

## ⭐ Support

If you find this project interesting, consider giving the repository a star ⭐.

Feedback and suggestions are always welcome!

**Built with curiosity, creativity, and AI.**
## 👥 Contributors

Narrivox AI was built through collaboration. Special thanks to both contributors for their work and efforts in developing this project.

| Contributor | GitHub Profile |
|---|---|
| **Ashish Kumar** | [@ashishmandal1889](https://github.com/ashishmandal1889) |
| **Ekansh Kumar** | [@EKANSHKUMAR1870](https://github.com/EKANSHKUMAR1870) |

### 🤝 Want to Contribute?

Contributions, suggestions, bug reports, and feature improvements are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

