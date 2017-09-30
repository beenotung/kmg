#!/usr/bin/env bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore STUB-mobileapps.keystore android-release-unsigned.apk STUB-mobileapps
