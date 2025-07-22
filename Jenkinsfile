pipeline {
  agent any // Use your Android build node label here

  environment {
     ANDROID_HOME = "/Users/naufal/Library/Android/sdk"  // or wherever your SDK is
    PATH = "${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${PATH}"
  }

  tools {
    nodejs 'NodeJS 18'  // Set this up in Jenkins → Global Tool Configuration
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
        sh 'npm install'
      }
    }

    stage('Clean Android Build') {
      steps {
        echo 'Cleaning previous builds...'
        sh 'cd android && ./gradlew clean'
      }
    }
     stage('Set local.properties') {
      steps {
        sh '''
          echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
        '''
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
