C=../node_modules/.bin/tsc
CFLAG=--lib ES2015

all: connection even-random

clean:
	${RM} connection-test.js

build: clean \
	connection-test.js

connection-test.js: connection-test.ts
	${C} ${CFLAG} connection-test.ts || true

connection: connection-test.js
	node connection-test.js

even-random-test.js: even-random-test.ts
	${C} ${CFLAG} even-random-test.ts || true

even-random: even-random-test.js
	node even-random-test.js
