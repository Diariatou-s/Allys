
// pipeline{
//     agent any
//     options {
// 		skipDefaultCheckout()
// 	}
//     environment {
//         USER_NAME = 'diariatou'
//          imageName = "allys"
//          dockerImageVersion = 'SNAPSHOT-1.0.0'
//          repo = "${JOB_NAME}"
//          DOCKER_REGISTRY_USER= 'diariatou'
//          DOCKER_REGISTRY_USER_PASSWORD= 'Sertygytoi123,'
//         }
//     tools {
//         // def scannerHome = tool 'SonarScanner';
//         nodejs 'node'
//         dockerTool 'docker'
//     }
//     stages{
//         stage('SCM Checkout') {
//             steps {
//                 git(branch: 'main', credentialsId: 'github',  url:'https://github.com/Diariatou-s/Allys.git')                   
//             }
//         }
//         stage('Check Packages'){
//             steps {
//                 sh 'npm install'
//                 sh 'npm run build'
//             }
//         }
//         // stage('SonarQube Analysis') {
//         //     steps{
//         //         withSonarQubeEnv() {
//         //             sh "${scannerHome}/bin/sonar-scanner"
//         //         }
//         //     }
//         // }
//         stage('Upload Tar to nexus'){
//             steps{
//                 nexusArtifactUploader artifacts: [
//                     [
//                         artifactId: 'allys',
//                         classifier: '',
//                         file: 'target/allys-0.0.1-SNAPSHOT.tar',
//                         type: 'tar'
//                     ]
//                 ],
//                 credentialsId: 'nexus',
//                 groupId: 'allys',
//                 nexusUrl: 'localhost:8081',
//                 nexusVersion: 'nexus3',
//                 protocol: 'http',
//                 repository: 'allys',
//                 version: '0.0.1-SNAPSHOT'
//             }
//         }
//         stage('Build Image'){
//             steps{
//                 script {
//                     sh "docker build -t ${DOCKER_REGISTRY_URL}/${env.imageName} ."
//                 }
//             }
//         }
//         stage('Connect To Registry'){
//             steps{
//                 sh "docker logout"
//                 sh "docker login ${DOCKER_REGISTRY_URL} --username ${env.DOCKER_REGISTRY_USER} --password ${env.DOCKER_REGISTRY_USER_PASSWORD}"
//             }
//         }
//         stage ('Push Docker Image'){
//             steps{
//                 script{
//                     sh "docker push ${DOCKER_REGISTRY_URL}/${env.imageName}:latest" 
//                 }
//             }
//         }
//         stage ('Delete Tempory Image'){
//             steps{
//                 sh "docker rmi ${DOCKER_REGISTRY_URL}/${env.imageName}:latest"
//             }
//         }
//         stage('Deploy to cluster') {
//             steps {
//                 script {
//                     sshagent(['demodeploy']) {
//                         sh'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl delete deploy --ignore-not-found=true allys'
//                         sh'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl delete svc --ignore-not-found=true demo-svc'
//                         sh 'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl apply -f /var/lib/jenkins/workspace/allys@2/deploymentservice.yml'
//                         sh 'sleep 30'
//                     } 
//                 }
//             }
//         }
//         stage("Message"){
//             steps{
//                 post {
//    			        failure {
//        			        mail to: 'diarrasylla15@gmail.com',
//              	        subject: "**Failed Pipeline**: ${currentBuild.fullDisplayName}",
//              	        body: "Something is wrong with ${env.BUILD_URL}"
//                     }
//                     success{
//                         mail to: 'diarrasylla15@gmail.com',
//                         subject: "**Success Pipeline**:${currentBuild.fullDisplayName}",
//            		        body: "Success of your build, here is the link of the build ${env.BUILD_URL}"
//                     }
//                 }
//             }
//         }
//     }
// }




pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      steps {
        // Checkout code from GitHub repository
        git 'https://github.com/myuser/myapp.git'
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
        SONAR_HOST_URL = 'http://sonarqube:9000'
        SONAR_LOGIN = credentials('sonarqube-login')
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

