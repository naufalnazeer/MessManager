pipeline {
  agent { label 'android' }  // Use your Android build node label here

  environment {
    ANDROID_HOME = "/home/jenkins/Android/Sdk" // Adjust path as per your machine
    PATH = "$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/cmdline-tools/latest/bin"
  }

  tools {
    nodejs 'NodeJS 18.6'  // Set this up in Jenkins → Global Tool Configuration
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing JavaScript dependencies...'
        sh 'yarn install --frozen-lockfile'
      }
    }

    stage('Clean Android Build') {
      steps {
        echo 'Cleaning previous builds...'
        sh 'cd android && ./gradlew clean'
      }
    }

    stage('Build APK') {
      steps {
        echo 'Building Android APK...'
        sh 'cd android && ./gradlew assembleRelease'
      }
    }

    // Optional: Run Android unit tests
    stage('Run Tests') {
      steps {
        echo 'Running Tests...'
        sh 'yarn test'
      }
    }

    stage('Archive APK') {
      steps {
        archiveArtifacts artifacts: 'android/app/build/outputs/apk/release/*.apk', fingerprint: true
      }
    }
  }

  post {
    success {
      echo '✓ Android build completed successfully!'
    }
    failure {
      echo '✗ Build failed. Check logs above.'
    }
  }
}
