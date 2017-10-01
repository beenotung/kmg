#!/bin/bash
## generate service
set -e
#./ionic g provider $@
for m in $@; do
  echo "m=$m"
  ./npm_ run ng g service $m
  mkdir "src/services/$m"
  mv "src/app/$m.service.ts" "src/services/$m/"
  mv "src/app/$m.service.spec.ts" "src/services/$m/"
  echo "export * from \"./$m.service\";" >> "src/services/$m/index.ts"
done
echo -n "remember to add "
for m in $@; do
  echo -n "$m, "
done
echo "in providers in src/app.modules.ts"
