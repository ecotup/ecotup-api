# ecotup-CC
This repository for ecotup project focusing on Cloud Computing Service, Google API Service and Node Js Rest API, in this repository we had list of service that we used in Google Cloud, we also had list of Google API Service that we use intergrated with Mobile Development learning path and how Node Js Rest API is being consume by Mobile Development learning path. However this Rest API are intended to help Mobile Development learning path to store user and driver data through Cloud SQL and Cloud Storage.

## Introduction
Cloud computing refers to the delivery of computing services, including storage, processing power, and software, over the internet. Instead of owning and maintaining physical servers or computing infrastructure, users can access these resources on-demand from a cloud service provider. This model offers a more flexible and scalable approach to computing, allowing organizations to scale their resources up or down based on their needs. However in this case we were using service from Google Cloud to help us in to solve our problem from configuring infrastructure and secure our networking environment.

## Service from Google Cloud that we use
- Cloud SQL 
We use Cloud SQL to store our relational data. in this time we choose Cloud SQL Enterprise edition and MySQL 5.7 Languange. We choose Cloud SQL because we can configure the type of machine that we need, how many data we can store in Cloud SQL, and also we can configure networking access to help Mobile Development learning path to access the database easier.
- Cloud Storage
We use Cloud Storage to store our non-relational data such as our user and driver profile picture in our storage in this service we had object life cycle management to help us maintaining the data version in Cloud Storage, we implement 2 object life cycle management rules : first, we use delete object rule if the data object had newer version or non-current data version, and second, we use delete object rule if the non-current version data after 7 days store in the google cloud storage.
- App Engine
We use Google Cloud Service App Engine to deploy our Rest API to help our mobile development to communicated with google Cloud SQL and Cloud Storage to store the data , update the data and delete the data in google cloud service through our Rest API Server. We choose App Engine because i want to focus on developing the code and let google manage our infrastructure.
- Cloud Run
We use Google Cloud Service Cloud Run to deploy our Machine Learning path backend modules service script using dockerfile and container image to serve the service to help our Mobile Development learning path to calculate distance between user and driver, and to help our user to find the nearest driver around the user so the user doesn't had to wait long enough to get driver.
- Container Registry
We use this service to store our containerized image from docker file to Google Cloud. This service could help us managing version of deployed service in Cloud Run and also could help us to deploy newer version of the backend module script easier.
- Google Cloud Source Repository
We use this in Development environment so we can easily track our latest version of our rest api that stored in Git Hub. After that we can track whenever there is error when we were deploying our Rest API we can easily revert it to previous version. 

## API from Google Cloud that we use
- Map API SDK For Android Development
This Google Cloud API help our mobile development learning path to implement google map to our android application so our user can see their location and seen the driver that will pick up their trash .
- Directions API
This Google Cloud API help us to guide our driver to pick up our user trash based on their location.

## About the Rest API Server 
The Rest API Server is developed to help our application to give the request from the end point and routes that we had so our application can get the response based on JSON object after that our application will display the response that our user could understand. The response that given out based on the data that we already stored in Cloud SQL and Cloud Storage.

## Javascript Library that we use 
- google-cloud/storage
- axios
- bcrypt
- body-parser
- cors
- dotenv
- express
- knex
- multer
- mysql
- uuid
- eslint

## About the Javascript Library
Most of them that still in used by prodution environment Rest API of Ecotup. Each of Javascript Library that complementing each other to help our Rest API to handle alot of type of request that coming to our server and provide correct response each request being handled.

## Folder list inside the repository and whats inside
In this repository is seperated with 2 branch :
- First, Development Branch 
In this branch we do a lot of testing to check readiness of our Rest API before deployed to Google Cloud App Engine. After we deploy using development branch we still monitoring the performance of the Rest API Service to encounter error that could happen when our application trying to request the Rest API server.
- Second , Production Branch
In this branch we feel the Rest API could be deploy and ready to serve in a lot of application request . eventhough at the beginning of this branch i had merged it from development branch.

## Evaluation 
After a lot trial and error , and also alot of test that has been done there is still some many things that we need to check in the Deployed Rest API service in google cloud from monitoring their perfomance and debugging whenever error occured in the server. We were confident enough to spoken that our Rest API is up to 85 % could serve our application request and giving response. Our backend modules service script also could provide us right solution to complement our service in android application.

## Further Work
We're already building up the Rest API Server, deploy backend modules service script and deploy the rest API server. There is still so many things that we need to do in the future, to improve our application from building private connection between our service, building IAM policy to secure environment in google cloud and also we can continue migrating our transaction to Firebase Realtime Database to make our application responsive to our user. 

## Afterwords
This is the end of Ecotup Cloud Computing Documentation. Thanks for stopping by and reading all of our Documentation. See you and have a nice day !