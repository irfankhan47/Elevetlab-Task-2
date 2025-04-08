# 🚀 Node.js CI/CD Pipeline with Jenkins, Docker, and GitHub on AWS EC2

This project demonstrates a complete CI/CD pipeline for a Node.js application using Jenkins, Docker, and GitHub, hosted on an AWS EC2 instance.

## 🧑‍💻 Author
**Irfan Khan**

## 📁 Project Structure

- ├── app.js
- ├── Dockerfile
- ├── package.json 
- ├── routes/ 
- │ └── api.js 
- └── Jenkinsfile

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

![1](https://github.com/user-attachments/assets/4d68ac48-98ac-48cf-8546-f29584fa5ea2)

# 1. Update system packages
- sudo apt update && sudo apt upgrade -y

# 2. Install Git
- sudo apt install git -y

# 3. Install Docker
- sudo apt install docker.io -y
- sudo systemctl start docker
- sudo systemctl enable docker
- sudo usermod -aG docker $USER
  
![5](https://github.com/user-attachments/assets/175457e3-7a56-4af7-a1e8-2ce0567acc05)

# 4. Install Node.js and npm

- curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
- sudo apt install -y nodejs
- 
![7](https://github.com/user-attachments/assets/04c5f062-3d5f-4f34-8b6d-e4b1cd1fd3bf)

# 5. Install Jenkins
- wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
- sudo sh -c 'echo deb http://pkg.jenkins.io/debian binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
- sudo apt update
- sudo apt install jenkins -y
- sudo systemctl start jenkins
- sudo systemctl enable jenkins

📦 Node.js Project Setup
- app.js
- package.json
- Dockerfile

🔧 Jenkins Setup
Open Jenkins at http://<your-ec2-public-ip>:8080

Install recommended plugins
- Create a new pipeline job named NodeJS-CICD
- Configure GitHub credentials (Manage Jenkins > Credentials)
- 
![docker cred](https://github.com/user-attachments/assets/e6d52ed4-d637-48e7-9bd9-d87255af71ff)

In the pipeline script section, use the following:

Jenkinsfile

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

![pipeline](https://github.com/user-attachments/assets/1abf0844-6ac1-4cc8-a7ce-b64c8bc86d9d)

After the pipeline runs successfully,
Your Node.js app will be live inside a Docker container on your EC2 instance.

# To verify
Run = sudo docker images 

![docker imagges](https://github.com/user-attachments/assets/348320e5-74d3-4e67-a92b-4011c7a7753d)

Run = sudo docker ps

![docker ps](https://github.com/user-attachments/assets/a5a2045a-18ec-42f2-933d-bdc3e28fa6ac)

Check Your HubDocker

![hubdocker](https://github.com/user-attachments/assets/2eaa1637-246c-4227-af2e-a289012ee42d)

## 🌐 Check Your App
You can test the application using the following URLs:

- Visit Home Route: [http://<your-ec2-ip>:3000/](http://<your-ec2-ip>:3000/)

![last](https://github.com/user-attachments/assets/276fc5d0-a456-4166-9a63-38d0a323aff0)

- Try API Endpoint: [http://<your-ec2-ip>:3000/api/hello](http://<your-ec2-ip>:3000/api/hello)

![apihello](https://github.com/user-attachments/assets/1ee07995-4482-4538-b160-bc2fe57161a9)

👨‍💻 Author
Irfan Khan
DevOps & Cloud Enthusiast
GitHub: @irfankhan47
