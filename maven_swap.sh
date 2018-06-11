#!/bin/bash
#remove jcenter
sed -i '/jcenter()/d' ./platforms/android/build.gradle
#append jcenter
sed -i '/maven {/{
N
N
a\
 jcenter()
}' ./platforms/android/build.gradle
cat ./platforms/android/build.gradle
