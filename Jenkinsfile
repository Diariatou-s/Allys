
pipeline{
    agent any
    // options {
	// 	skipDefaultCheckout()
	// }
    // environment {
    //     USER_NAME = 'diariatou'
    //      imageName = "allys"
    //      dockerImageVersion = 'SNAPSHOT-1.0.0'
    //      repo = "${JOB_NAME}"
    //      DOCKER_REGISTRY_USER= 'diariatou'
    //      DOCKER_REGISTRY_USER_PASSWORD= 'Sertygytoi123,'
    //     }
    tools {
        // def scannerHome = tool 'SonarScanner';
        nodejs 'node'
        dockerTool 'docker'
    }
    stages{
        stage('SCM Checkout') {
            steps {
                git(branch: 'main', credentialsId: 'allys-pr',  url:'https://github.com/Diariatou-s/Allys.git')                   
            }
        }
        stage('Check Packages'){
            steps {
                sh 'npm install --production'
            }
        }
        // stage('SonarQube Analysis') {
        //     steps{
        //         withSonarQubeEnv() {
        //             sh "${scannerHome}/bin/sonar-scanner"
        //         }
        //     }
        // }
        // stage('Upload Tar to nexus'){
        //     steps{
        //         nexusArtifactUploader artifacts: [
        //             [
        //                 artifactId: 'allys',
        //                 classifier: '',
        //                 file: 'target/allys-0.0.1-SNAPSHOT.tar',
        //                 type: 'tar'
        //             ]
        //         ],
        //         credentialsId: 'nexus',
        //         groupId: 'allys',
        //         nexusUrl: 'localhost:8081',
        //         nexusVersion: 'nexus3',
        //         protocol: 'http',
        //         repository: 'allys',
        //         version: '0.0.1-SNAPSHOT'
        //     }
        // }
        stage('Build Docker Image') {
            steps {
                script {
                    def app = docker.build("allys-pr:1.0.0")
                    app.save("./allys:1.0.0")
                }
            }
        }
        // stage('Save Docker Image') {
        //     steps {
        //         sh "docker save allys-pr:1.0.0 -o ./allys-pr.tar"
        //         stash includes: './allys-pr.tar', name: 'allys-pr'
        //     }
        // }
        // stage('Connect To Registry'){
        //     steps{
        //         sh "docker logout"
        //         sh "docker login ${DOCKER_REGISTRY_URL} --username ${env.DOCKER_REGISTRY_USER} --password ${env.DOCKER_REGISTRY_USER_PASSWORD}"
        //     }
        // }
        // stage ('Push Docker Image'){
        //     steps{
        //         script{
        //             sh "docker push ${DOCKER_REGISTRY_URL}/${env.imageName}:latest" 
        //         }
        //     }
        // }
        // stage ('Delete Tempory Image'){
        //     steps{
        //         sh "docker rmi ${DOCKER_REGISTRY_URL}/${env.imageName}:latest"
        //     }
        // }
        // stage('Deploy to cluster') {
        //     steps {
        //         script {
        //             sshagent(['demodeploy']) {
        //                 sh'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl delete deploy --ignore-not-found=true allys'
        //                 sh'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl delete svc --ignore-not-found=true demo-svc'
        //                 sh 'ssh -oStrictHostKeyChecking=no root@10.0.0.20 kubectl apply -f /var/lib/jenkins/workspace/allys@2/deploymentservice.yml'
        //                 sh 'sleep 30'
        //             } 
        //         }
        //     }
        // }
        // stage("Message"){
        //     steps{
        //         post {
   		// 	        failure {
       	// 		        mail to: 'diarrasylla15@gmail.com',
        //      	        subject: "**Failed Pipeline**: ${currentBuild.fullDisplayName}",
        //      	        body: "Something is wrong with ${env.BUILD_URL}"
        //             }
        //             success{
        //                 mail to: 'diarrasylla15@gmail.com',
        //                 subject: "**Success Pipeline**:${currentBuild.fullDisplayName}",
        //    		        body: "Success of your build, here is the link of the build ${env.BUILD_URL}"
        //             }
        //         }
        //     }
        // }
    }
}