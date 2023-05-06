
pipeline{
    agent any
    environment {
        GIT_CRED = credentials('allys-pr')
        SONARQUBE_CRED = credentials('allys-sonarqube')
        imageName = "allys-pr"
    }
    stages{
        stage('SCM Checkout') {
            steps {
                git(branch: 'main', credentialsId: "$GIT_CRED",  url:'https://github.com/Diariatou-s/Allys.git')                   
            }
        }
        stage('Check Packages'){
            steps {
                sh 'npm install --production'
            }
        }
        stage('Build Docker Image') {
            steps {
                docker.build("${env.imageName}:${env.BUILD_NUMBER}")
            }
        }
        stage('Test') {
            steps {
                // Run tests on the Docker image
                script {
                        docker.image("${env.imageName}:${env.BUILD_NUMBER}").withRun("-p 3000:3000") { 
                        sh 'npm test'
                    }
                }
            }
        }
        stage('SonarQube Scan') {
            environment {
                SONARQUBE_URL = "http://localhost:9000"
                SONARQUBE_TOKEN = "$SONARQUBE_CRED"
            }
            steps {
                // Run the SonarQube scan
                withSonarQubeEnv {
                    sh "npm run sonarqube -Dsonar.projectKey=allys-pr -Dsonar.host.url=$SONARQUBE_URL -Dsonar.login=$SONARQUBE_TOKEN"
                }
            }
        }
        stage('Push') {
            environment {
                NEXUS_URL = "http://localhost:8081"
                NEXUS_CRED_ID = "allys-pr"
                DOCKER_REGISTRY = "docker-cr"
            }
            steps {
                // Login to the Docker registry
                withCredentials([usernamePassword(credentialsId: NEXUS_CRED_ID, usernameVariable: 'diariatou', passwordVariable: 'allys_nexus_passwd')]) {
                    sh "docker login -u $diariatou -p $allys_nexus_passwd $NEXUS_URL/$DOCKER_REGISTRY"
                }
                
                // Tag the Docker image for Nexus repository
                script {
                    docker.tag("${env.imageName}:${env.BUILD_NUMBER}", "$NEXUS_URL/$DOCKER_REGISTRY/${env.imageName}:${env.BUILD_NUMBER}")
                }
                
                // Push the Docker image to Nexus repository
                sh "docker push $NEXUS_URL/$DOCKER_REGISTRY/${env.imageName}:${env.BUILD_NUMBER}"
            }
        }
    }
    post {
        success {
            // Send email notification upon success
            mail to: 'diarrasylla15@gmail.com',
                 subject: 'Build Succeeded!',
                 body: "Your build succeeded!"
        }
        failure {
            // Send email notification upon failure
            mail to: 'diarrasylla15@gmail.com',
                 subject: 'Build Failed!',
                 body: "Your build failed! Please check the build log for more information."
        }
    }
}