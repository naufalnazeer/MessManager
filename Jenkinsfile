pipeline {
  agent any

  environment {
    ANDROID_HOME = "$HOME/Library/Android/sdk"
    PATH = "$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH"
  }

  tools {
    nodejs "NodeJS 18"  // Make sure NodeJS 18 is installed under Manage Jenkins > Global Tool Configuration
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/yourusername/your-repo.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build APK') {
      steps {
        sh './gradlew assembleRelease -p android'
      }
    }

    stage('Archive APK') {
      steps {
        archiveArtifacts artifacts: 'android/app/build/outputs/**/*.apk', fingerprint: true
      }
    }
  }
}
