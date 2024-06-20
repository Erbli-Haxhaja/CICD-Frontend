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
    }
    stage('Testing') {
      steps {
        script {
          echo 'Running tests...'
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${registry}:${env.BUILD_NUMBER}")
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {
            docker.image("${registry}:${env.BUILD_NUMBER}").push()
            docker.image("${registry}:${env.BUILD_NUMBER}").push("latest")
          }
        }
      }
    }
    stage('Deploy to Green Environment') {
      steps {
        script {
          sh """
            aws ssm send-command --instance-ids ${ec2InstanceId} --document-name "AWS-RunShellScript" --comment "Deploy Green" --parameters commands="
              docker pull ${registry}:latest && \
              docker stop ${greenContainerName} || true && \
              docker rm ${greenContainerName} || true && \
              docker run -d --name ${greenContainerName} -p 8081:80 ${registry}:latest
            "
          """
        }
      }
    }
    stage('Switch Traffic to Green') {
      steps {
        script {
          sh """
            aws ssm send-command --instance-ids ${ec2InstanceId} --document-name "AWS-RunShellScript" --comment "Switch to Green" --parameters commands="
              sed -i 's/${blueContainerName}/${greenContainerName}/' /etc/nginx/conf.d/default.conf && \
              systemctl reload nginx
            "
          """
        }
      }
    }
    stage('Clean Up Blue Environment') {
      steps {
        script {
          sh """
            aws ssm send-command --instance-ids ${ec2InstanceId} --document-name "AWS-RunShellScript" --comment "Clean Up Blue" --parameters commands="
              docker stop ${blueContainerName} || true && \
              docker rm ${blueContainerName} || true
            "
          """
        }
      }
    }
  }
}
