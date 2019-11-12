## Setup
This is an dockerized react application so the commands aren't as straight forward as usual

### Build the image
`Docker build -t <username>/conferenceapp .`
This will build the image needed to start and run a container. This is only required to be done one time. After this only the next command is required to start the local dev server for coding!

### Run the Dev Server
`docker run -v %cd%:/var/www/localhost/htdocs/ --name conferenceapp -v var/www/localhost/htdocs/node_modules/ -p 3000:3000 -p 80:80 <username>/conferenceapp`
This will run a docker container named **conferenceapp**. This will start the dev server at localhost:3000 with hot reloading. 

When done developing close the container with

`docker container conferenceapp stop` 

This command will also remove the container.

(This process could be improved so you can run docker up/down instead)

### Production build
`docker build -f Docker-production -t conferenceapp:prod .`

This builds the image which compiles the production version of the react app.

### Publish
`docker tag conferenceapp:prod registry.heroku.com/conference-app-it/web`

This adds a tag necessary for Heroku to understand the image

`docker push registry.heroku.com/conference-app-it/web`

This pushes the image to the Heroku container

`heroku container:release web --app conference-app-dwt`

Finally this publishes the newly pushed image
