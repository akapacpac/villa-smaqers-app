#!/bin/bash

echo "🚀 Building APK for Villa des Smaqers Brisés..."

# Check if we're logged into EAS
if ! eas whoami > /dev/null 2>&1; then
    echo "❌ Not logged into EAS. Please run: eas login"
    exit 1
fi

echo "✅ Logged into EAS"

# Try to build the APK
echo "📱 Building APK..."
eas build --platform android --profile preview --non-interactive

if [ $? -eq 0 ]; then
    echo "✅ APK built successfully!"
    echo "📥 Download your APK from: https://expo.dev"
    echo "🔗 Share the APK file with your friends!"
else
    echo "❌ Build failed. Trying alternative method..."
    
    # Alternative: Create a web-based APK
    echo "🌐 Creating web-based APK alternative..."
    
    # Create a simple APK using Capacitor (if available)
    if command -v npx &> /dev/null; then
        echo "📦 Installing Capacitor..."
        npm install @capacitor/core @capacitor/cli @capacitor/android
        
        echo "🔧 Initializing Capacitor..."
        npx cap init "Villa des Smaqers Brisés" "com.villadesmaqersbrises.app"
        
        echo "📱 Adding Android platform..."
        npx cap add android
        
        echo "🔨 Building APK..."
        npx cap build android
        
        echo "✅ APK created in android/app/build/outputs/apk/"
    else
        echo "❌ Cannot create APK. Please use the PWA version instead."
        echo "🌐 Open mobile-preview.html in your browser"
        echo "📱 Add to home screen for app-like experience"
    fi
fi
