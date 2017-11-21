#!/bin/bash
npm-run tsc \
  src/model/core/index.ts \
  --lib es2015,dom \
  #--target es2015 \
  #--outDir lib
