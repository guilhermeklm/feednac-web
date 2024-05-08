run-dese:
	@npm run start-dese

run-prod:
	@npm run start-prod

install:
	@npm install

docker-publish-image: docker-build-image docker-image-tag docker-image-push

docker-build-image:
	@docker build . -t guilhermeklm/feednac-web:$(VERSION) --target=$(TARGET) 

docker-image-tag: 
	@docker image tag guilhermeklm/feednac-web:$(VERSION) guilhermeklm/feednac-web:latest

docker-image-push: 
	@docker image push guilhermeklm/feednac-web:$(VERSION) 
	@docker image push guilhermeklm/feednac-web:latest

