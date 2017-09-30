#!/bin/bash
## generate service
set -e
#./ionic g provider $@
./npm_ run ng g service $@
for m in $@; do
  mkdir "src/services/$m"
  mv "src/app/$m.service.ts" "src/services/$m/"
  mv "src/app/$m.service.spec.ts" "src/services/$m/"
  echo "export * from \"./$m.service\";" >> "src/services/$m/index.ts"
done
