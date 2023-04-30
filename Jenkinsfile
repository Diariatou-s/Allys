
pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        // Checkout code from GitHub repository
        git 'https://github.com/Diariatou-s/Allys.git'
      }
    }
    
    stage('Build and test') {
      steps {
        // Build Docker image and run tests
        sh 'docker build -t myapp .'
        sh 'docker run --rm myapp npm test'
      }
    }
    
    stage('SonarQube scan') {
      environment {
        // Set environment variables for SonarQube scan
        SONAR_HOST_URL = 'http://localhost:9000'
        SONAR_LOGIN = credentials('admin')
      }
      steps {
        // Run SonarQube scan on code
        sh 'docker run --rm -e SONAR_HOST_URL=$SONAR_HOST_URL -e SONAR_LOGIN=$SONAR_LOGIN -v "$PWD:/usr/src" sonarsource/sonar-scanner-cli'
      }
    }
    
    stage('Push to Nexus') {
      steps {
        // Push Docker image to local Nexus container
        withCredentials([usernamePassword(credentialsId: 'nexus-login', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
          sh 'docker login -u $NEXUS_USERNAME -p $NEXUS_PASSWORD my-nexus-repo:8081'
          sh 'docker tag myapp my-nexus-repo:8081/myapp:latest'
          sh 'docker push my-nexus-repo:8081/myapp:latest'
        }
      }
    }
  }
}

