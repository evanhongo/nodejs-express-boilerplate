PATH := ./node_modules/.bin:${PATH}
.PHONY: build clean

all: build

build: clean
	@echo "Build..."
	pnpm run build-cjs

clean:
	@echo "Clean..."
	-rd /s /q build
	-rm -rf build

run:
	@echo "Startup server..."
	pm2 start ./ecosystem.config.js

down:
	@echo "Stop server..."
	pm2 delete ./ecosystem.config.js