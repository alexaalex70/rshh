# Reset Health Mobile Application

## - We use react native, without expo for this project.

## - We use Atomic Design. Why?

     - build consistent, solid and reusable design systems.
     - idea of separating the components in atoms, molecules, organisms, templates and pages.
     - the main principle is to separate responsabilities.

### Atoms:

    - the smallest possible components, such as buttons, titles... They can be used globally or within other components

### Molecules

    - they are composition of one or more components of atoms. Molecules can have their own properties and create functionalies by using atoms, which don't have any function or action by themselves.

### Organisms

    - are the combination of molecules or even with atoms to create more complex interfaces. In this state components start to get a shape, but should be independent, portable and reusable enough to be reusable in any content.

### Templates

    - here we have to set components context. The templates create relationships between the organisms and others components through positions, placements and patterns of the pages but it doesn't have any style, color or component rendered. Looks like a wireframe.

### Pages

    - navigate part of the app and it's where the components are distributed in one specific template.

### Rules

- The Atomic Design should have a file of variables and it must be imported by each component;
- The atoms should be written without margins and positions;
- Only the molecules and organisms can set the positions of atoms, but these stacks can’t have any styles of margins and positions;
- Templates have only one function: to set the grid of pages but never positions of specific components;
- Pages render the components with a template defined and it’s here that the Atomic Design will be connected to the rest of the application;

---

## Android Emulator Guide

### Requirements
    - node
    - watchman
    - JDK >=v8: `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`
    - [Android Studio ](https://developer.android.com/studio/index.html)

### Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 10 (Q) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio. 

You can find the SDK Manager by going to Preferances (`CMD + ,`) or by pressing on "More Actions" on the homepage and selecting SDK Manager. 

Select the "SDK Platforms" tab inside the SDK Manager and check "Show Package Details". Look for `Android 10 (Q)` and make sure the following are checked:
    - `Android SDK Platform 29`
    - `Intel x86 Atom_64 System Image` AND `Google APIs Intel x86 Atom System Image`

**Click Apply and let everything download.**

Next step is going to be select "SDK Tools", make sure the "Show Package Details" is checked. Expand `Android SDK Build-Tools 31` and make sure `29.0.2` and `30.0.2` is selected. Also, select `Android SDK Command-line Tools (latest)` and `Android SDK Platform-Tools`.

**Click Apply and let everything download.**

### Configure ANDROID_HOME variable

Open up your Terminal and go to the home directory. Create a new file called `.zshrc`, if you're using bash you should create a file called `.bashrc` but I strongly recommend using zsh.

Now, open that file with your favorite text editor, paste the following and save your file: 
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Now go back to your terminal window and use the following command so we can load the config into our current shell:
```
source $HOME/.zshrc
```

Save everything and restart your computer (or just the Terminal, but to be on the safe side I'd restart the entire computer).

Open up the terminal again and check if `$ANDROID_HOME` has been set by writing the following command:
```
echo $ANDROID_HOME
```

The return string should be the path to our variable.

### Configure Emulator

Open up Android Studio, click on "More Actions" and select "AVD Manager". Hit "Create Virtual Device". Now pick Pixel 5 and hit "Next". Now select `R` which has `API Level` 30. Hit "Next", give it a name and you're done. Do the same thing with Pixel 3 but instead of selecting `R` select `Q` which has `API Level` 29. This way we'll have two different screen sizes with two different Android versions installed. Of course, the best way would be to set up as many emulators as you can in order to verify everything as meticulously as possible.

### How to start working with the Android Emulator?

Whenever we want to use the Android Emulator, we go ahead and open Android Studio and follow the next steps:
    - Click on "More Actions"
    - Select "AVD Manager"
    - On the right side of the screen press the play icon for the emulator that you want to open
    - Go to Terminal, start your React Native server with `npm start -- --reset-cache`
    - Open a new Window, cd to your project folder and run the following command: `npx react-native run-android`

Your app should now run on the Android emulator.

### Installing fonts via react-native-vector-icons

#### iOS

    - CD your way into the `ios` folder and run the following command: `pod install`
    - now go back to the root folder and run the command `npm i`

The fonts should be now ready to use.

#### Android

- Copy the contents in the `Fonts` folder to `android/app/src/main/assets/fonts` (_note lowercase fonts folder_).

##### Integrating library for `getImageSource` support

These steps are optional and only needed if you want to use the `Icon.getImageSource` function.

- Edit `android/settings.gradle` to look like this (without the +):

  ```diff
  rootProject.name = 'MyApp'

  include ':app'

  + include ':react-native-vector-icons'
  + project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
  ```

- Edit `android/app/build.gradle` (note: **app** folder) to look like this:

  ```diff
  apply plugin: 'com.android.application'

  android {
    ...
  }

  dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
  + compile project(':react-native-vector-icons')
  }
  ```

- Edit your `MainApplication.java` (deep in `android/app/src/main/java/...`) to look like this (note **two** places to edit):

  ```diff
  package com.myapp;

  + import com.oblador.vectoricons.VectorIconsPackage;

  ....

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage()
  +   , new VectorIconsPackage()
      );
    }

  }
  ```

