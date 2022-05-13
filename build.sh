#!/bin/sh

test -f build.local.sh && source build.local.sh

git pull

if test "$1" = "local"
then
  echo "--> Not increasing build number"
  BUILD_NUMBER="$(cat build-number)"
else
  BUILD_NUMBER="$(expr `cat build-number` + 1)"
  echo $BUILD_NUMBER > build-number

  git add build-number
  git commit -m "Build number increase by Jenkins"
  git push
fi

if test "$1" = "dist"
then
  echo "--> Building for App Store"
  FIREBASE=0
else
  echo "--> Building for Firebase AdHoc distribution"
  FIREBASE=1
fi

if test -z "$2"
then
  RHPENV=mordor
else
  RHPENV=$2
fi

echo "Building for ${RHPENV}"
cat .env.${RHPENV} > .env

npm cache clean --force
rm -rf node_modules package-lock.json build
npm install

rm -rf tmp && mkdir tmp

pushd ios
rm -rf Pods Podfile.lock
/usr/bin/arch -x86_64 pod install
/usr/libexec/Plistbuddy -c "Set CFBundleVersion ${BUILD_NUMBER}" "ResetHealth/Info.plist"
xcodebuild clean
xcodebuild -workspace ResetHealth.xcworkspace -scheme "ResetHealth" archive -allowProvisioningUpdates -sdk iphoneos -configuration release -archivePath ../tmp/ResetHealth.xcarchive GCC_PREPROCESSOR_DEFINITIONS="FIREBASE_ADHOC=${FIREBASE}"
xcodebuild -exportArchive -archivePath ../tmp/ResetHealth.xcarchive -exportOptionsPlist iosExportOptions.plist -allowProvisioningUpdates -exportPath ../tmp/iphone
git checkout ResetHealth/Info.plist
popd

firebase appdistribution:distribute --app 1:917513562012:ios:5588c5d886fd28a9ad8a59 --token "$(cat ~/.firebase-token)" --release-notes "Build ${BUILD_NUMBER} ${RHPENV}" --groups "reset-ios-testers" tmp/iphone/ResetHealth.ipa

pushd android
sed -i.bak "s/versionCode [0-9]*/versionCode ${BUILD_NUMBER}/" app/build.gradle
./gradlew clean assembleRelease
firebase appdistribution:distribute --app 1:917513562012:android:ed6cef3c2c96f39aad8a59 --token "$(cat ~/.firebase-token)" --release-notes "Build ${BUILD_NUMBER} ${RHPENV}" --groups "reset-android-testers" app/build/outputs/apk/release/app-release.apk
git checkout app/build.gradle
popd
