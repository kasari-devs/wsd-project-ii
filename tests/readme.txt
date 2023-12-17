# Course Project 2: 

Quiz application

## Description

Within this application, users can engage in two main activities: taking quizzes or creating their own.
The platform features a diverse array of topics curated by the site administrator. The exclusive privilege of topic creation and deletion is reserved for the admin.
Registered users, on the other hand, have the ability to generate questions for any topic or participate in quizzes where questions are presented randomly. 
Furthermore, registered users are empowered to create and delete both questions and corresponding answers.

GET requests made to /api/questions/random will return a random question and all answers associated withe the question. the returned object looks as follows:

    {
    "questionId": 1,
    "questionText": "How much is 1+1?",
    "answerOptions": [
            { "optionId": 1, "optionText": "2" },
            { "optionId": 2, "optionText": "4" },
            { "optionId": 3, "optionText": "6" },
        ]
    }

POST requests to: curl -X POST -H "Content-Type: application/json" -d '{"questionId": questionId, "optionId": optionId}' insert URL here/api/questions/answer
will return {"correct":true/false} in the response body depending on the given parameters


## Project link

https://kasari-wsd-project-ii.onrender.com/

### Dependencies
* This application waas created using Deno oak framework
* This application is intended to run within a Docker environment. When running it locally, it's advisable to utilize the skeleton provided by the course creators.
* change DockerFile settings according to your local environment.

### Installing

* download the skeleton from this address: https://fitech101.aalto.fi/web-software-development/35-course-project-ii/2-project-submission-and-reviews/
* replace "drill-and-practice" folder from the skeleton with drill-and-practice from this projet add folder to skeleton
* change DockerFile settings according to your local environment.

### Executing program

* How to run the program
* docker-compose up --build

