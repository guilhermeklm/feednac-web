run-local:
	@npm run start-local

run-prod:
	@npm run start-prod

install:
	@npm install

docker-publish-image: docker-build-image docker-image-tag docker-image-push

docker-build-image:
	@docker build . -t guilhermeklm/feednac-api:$(VERSION) --target=$(TARGET) 

docker-image-tag: 
	@docker image tag guilhermeklm/feednac-api:$(VERSION) guilhermeklm/feednac-api:latest

docker-image-push: 
	@docker image push guilhermeklm/feednac-api:$(VERSION) 
	@docker image push guilhermeklm/feednac-api:latest

