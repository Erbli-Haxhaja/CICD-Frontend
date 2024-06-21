pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
  }

  environment {
    NODE_ENV = "production"
    registry = 'eeba19/cicd-frontend'
    blueContainerName = 'frontend-blue'
    greenContainerName = 'frontend-green'
    ec2InstanceId = 'i-0d201d57392da5b64'
  }

  stages {
    stage('SCM') {
      steps {
        checkout scm
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
    stage('Linting') {
      steps {
        script {
          def scannerHome = tool 'Sonarqube';
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
    stage('Testing') {
      steps {
        script {
          echo 'Running tests...'
        }
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${registry}:${env.BUILD_NUMBER}")
        }
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {
            dockerImage.push()
            dockerImage.push("latest")
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
    stage('Deploy App') {
      steps {
        withCredentials([
          string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
          string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
          withEnv(["AWS_DEFAULT_REGION=us-east-1"]) {
            script {
              sh '''#!/bin/bash
                echo "Setting up AWS CLI with provided credentials"
                aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
                aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                aws configure set region $AWS_DEFAULT_REGION

                echo "Validating AWS CLI configuration"
                aws sts get-caller-identity

                echo "Sending command to EC2 instance to deploy Vue.js app"
                aws ssm send-command --instance-ids $ec2InstanceId --document-name "AWS-RunShellScript" --comment "Deploy Vue.js App" --parameters commands='
                  docker stop vuejs-frontend || true && \
                  docker rm vuejs-frontend || true && \
                  docker pull $registry:latest && \
                  docker run -d --name vuejs-frontend -p 80:80 $registry:latest
                '
              '''
            }
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail()
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        sendFailureEmail()
      }
    }
  }
}

def sendFailureEmail() {
  emailext (
    subject: "Pipeline Stage has failed.",
    body: "The Jenkins pipeline stage has failed. Please check the details.",
    to: "eeba.haxhaja@gmail.com"
  )
}
