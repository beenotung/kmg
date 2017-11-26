#!/usr/bin/env bash
/opt/android-sdk/build-tools/25.0.2/zipalign -v 4 android-release-unsigned.apk STUB-release-signed.apk
