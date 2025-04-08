# 🚀 Node.js CI/CD Pipeline with Jenkins, Docker, and GitHub on AWS EC2

This project demonstrates a complete CI/CD pipeline for a Node.js application using Jenkins, Docker, and GitHub, hosted on an AWS EC2 instance.

## 🧑‍💻 Author
**Irfan Khan**

## 📁 Project Structure

. ├── app.js ├── Dockerfile ├── package.json ├── routes/ │ └── api.js └── Jenkinsfile

---

## ✅ Prerequisites

- AWS EC2 (Ubuntu)
- GitHub Repository
- Jenkins installed and configured
- Docker installed on EC2
- Git installed
- Node.js and npm installed

---

## ⚙️ EC2 Instance Setup

# 1. Update system packages
sudo apt update && sudo apt upgrade -y

# 2. Install Git
sudo apt install git -y

# 3. Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
(https://github.com/user-attachments/assets/7d30b383-bdf5-4a6e-b24d-56e3eb37c42c)

# 4. Install Node.js and npm

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
(https://github.com/user-attachments/assets/bc41adeb-f9db-476c-b77e-fb09ae86acc1)

# 5. Install Jenkins
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
📦 Node.js Project Setup
app.js
javascript
Copy
Edit
const express = require('express');
const app = express();
const port = 3000;

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
routes/api.js
javascript
Copy
Edit
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Jenkins CI/CD!');
});

module.exports = router;
package.json
json
Copy
Edit
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
🐳 Docker Setup
Dockerfile
Dockerfile
Copy
Edit
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
🔧 Jenkins Setup
Open Jenkins at http://<your-ec2-public-ip>:8080

Install recommended plugins

Create a new pipeline job named NodeJS-CICD

Configure GitHub credentials (Manage Jenkins > Credentials)

In the pipeline script section, use the following:

Jenkinsfile
groovy
Copy
Edit
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'nodejs-app'
        GIT_REPO = 'https://github.com/irfankhan47/Elevetlab-Task-2.git'
        DOCKER_USER = 'irfankhan47'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop nodeapp || true
                    docker rm nodeapp || true
                    docker run -d -p 3000:3000 --name nodeapp $DOCKER_IMAGE
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh '''
                        echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                        docker tag $DOCKER_IMAGE $DOCKERHUB_USER/$DOCKER_IMAGE:latest
                        docker push $DOCKERHUB_USER/$DOCKER_IMAGE:latest
                    '''
                }
            }
        }
    }
}
🚀 Run Jenkins Pipeline
After saving the job, click "Build Now"

On successful build, your app will be:

Built from GitHub

Dockerized and pushed to DockerHub

Deployed on your EC2 instance

🌐 Check Your App
Visit: http://<your-ec2-ip>:3000/api

You should see:

csharp
Copy
Edit
Hello from Jenkins CI/CD!
