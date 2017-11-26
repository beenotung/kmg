C=../node_modules/.bin/tsc
CFLAG=--lib ES2015

all: connection

clean:
	${RM} connection-test.js

build: clean \
	connection-test.js

connection-test.js: connection-test.ts
	${C} ${CFLAG} connection-test.ts || true

connection: connection-test.js
	node connection-test.js
