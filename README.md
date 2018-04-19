# IRCC Rescheduler

This is a mono-repo containing the various microservices that collectively allow users to reschedule their language tests during the citizenship process.

Each microservice is housed in it's own folder, with additional details to be found in an accompanying readme file.

## Web

As the name implies, the web microservice is a web application that allows users to fill in the details needed to reschedule their appointment.

## API

This microservice is responsible for receiving data from the web service, validating it and notifying IRCC.

