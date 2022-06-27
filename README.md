# Cohere Camping Creator

Welcome to Cohere Camping Creator! 🏕️

This project was cross-submitted to FreyHacks and SimpliHacks 2.0, and was awarded 'Best Use of NLP Cohere' from both hackathons.

# Links

[Presentation and Demo Video](https://www.youtube.com/watch?v=hYpDEOrb1ss)

[Website Link](https://coherecampingcreator.vercel.app/)

[Devpost](https://devpost.com/software/cohere-camping-creator)

## Inspiration

With themes related to **summer, nature, outdoor adventures, and the environment** in general, camping is something many people do during the hot months to unwind. Although they are typically exciting road trips, sometimes there are moments when you aren't sure what to do and need some inspiration. Maybe everyone sitting around the campfire has gone quiet and you're looking to spark up a conversation. Look no further than Cohere Camping Creator.

## What it does

As the name implies, Cohere Camping Creator focuses on using natural language processing (NLP) from Cohere to "create"/generate text, which is created from a model based on example input prompts given to it.  

Generator Features:
- If the user is out camping and wants a list of things to do, this project can generate a list of activities to do during camping. 
- Will generate a question that you can ask at a campfire or during the road trip journey. Perfect for sparking up deep conversations!
- Creates the title of a spooky, scary story to tell during the campfire. Will also create some snippets of the story, but leaves it up to you to improvise the rest.
- Generates 3-4 truth questions for Truth or Dare. A bit wacky and random, but could lead to some flustered individuals or funny moments!

In addition, this project also allows the user to save those generated texts and send them to a phone number via Twilio! 

Since knowing the weather is important for camping, this project also features the usage of a weather API. One thing not commonly discussed during the summer is Heat Index, which is the perceived/apparent temperature that a human feels and is based on temperature as well as relative humidity. This information is included on the weather page.

## How we built it

As an alternative to Figma design, I created a prototype website using Typedream. This process was very quick and easy, and I found it very helpful to visualize how the website was going to look before actually making it. I could also import some styles from the website to my actual CSS styling. 

Then, I played around with the Cohere AI Playground, which allows the user to test out how the API would generate text. I created sample input prompts and presets for each category that I needed (eg. questions, scary stories, etc.)

The front-end was created using React (plus HTML, CSS, and JavaScript). I used node.js and Express for the back-end, which was used for the NLP Cohere and Twilio APIs. I also utilized the OpenWeatherMap API. Finally, the front-end was deployed on Vercel and the back-end on Heroku.

## Challenges we ran into

During the creation of my project, I came across many major errors that halted my progress.

The biggest one was the process.env variables being undefined and/or did not call the API correctly. Even after installing dotenv, adding the appropriate lines of code (ex. require('dotenv').config), and adding REACT_APP_ in front of the variable, it would not work. I even combined the frontend and backend into the same folder.
Thinking it was just a local machine problem, I tried to deploy to Vercel to no avail. However, when I deployed Heroku, I was only able to access the back-end, but I could receive API calls. Then, I changed the API_URL from localhost to the Heroku URL in my front-end, which fixed the problem. This took a couple of hours to troubleshoot, but I learned a lot about frontend and backend deployment.

It was also challenging doing a solo-hack, since I am required to complete all tasks by myself. However, it was a great learning experience.

## Accomplishments that we're proud of

I am proud of the fact that I was able to test out new technologies that I have never used before, and implement them into a project. 

I am also proud of the fact that I took this solo-hack challenge on, which caused me to learn more about frontend, backend, design, and presentation.

## What we learned

I learned about NLP Cohere, Twilio, OpenWeatherMap API, and Typedream. 

In particular, I spent a good amount of time learning about natural language processing (NLP) since it was a new topic. I learned that Cohere is capable of tasks such as classification, summarization, entity extraction, and embedding (grouping). I also learned about variables/concepts such as Temperature (degrees of randomness/creativity), Likelihood (next word) and Tokens (amount of characters). 

I also watched a lecture from Cohere titled 'Generating and Understanding Natural Language with AI', which helped me learn more about NLP.

Since this project is designed to be used on mobile, and it was not created as a mobile app, I paid extra attention to responsive web design. The web app should be acceptable on all mobile screens. I learned a lot about media queries during the project.

## What's next for Cohere Camping Creator

I hope to create a mobile version of Cohere Camping Creator, and also improve the UI/UX design aesthetics of this project. Adding more features that warn and educate users on summer ailments (ex. dehydration, sunscreen reapplication for UV rays) is also another area I want to investigate. I would also like to add weather alerts, and have Twilio send a text message if there is a weather warning. 

## How to Run

Visit the deployed website [here](https://coherecampingcreator.vercel.app/).

If you want to run it on your local machine, type 'npm install' and install all dependencies such as react-router, twilio, express, etc.

Then, you will need to receive API keys for all environment variables (Cohere API, Twilio API, and OpenWeatherMap API). Run the front-end using 'npm start'. Then,start the server using 'pm run-script run'(or 'cd server' and type 'node index.js').
