.PHONY: build deploy-aws undeploy-aws

build:
	rm -rf ./build
	npm run build

serve-local: build ## Serve site locally (npm install -g serve)
	serve ./build -p 3004

deploy-aws: build ## Deploy site on S3
	serverless deploy --stage serverless --verbose --config serverless.yml

undeploy-aws: ## Undeploy site from S3
	serverless remove --stage serverless --verbose --config serverless.yml
