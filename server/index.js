require("dotenv").config(); //dot env
const path = require("path");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

//Cohere requirements
console.log(process.env.COHERE_API_KEY)
const cohere = require("cohere-ai");
cohere.init(`${process.env.COHERE_API_KEY}`);

//Twilio requirements
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// API to get Activities
app.get("/api/activities", async (req, res) => {
  const response = await cohere.generate("xlarge", {
    prompt:
      "This is a list of ideas for things to do while camping:\n\n1. Set up a tent\n2. Make a campfire\n3. Go swimming\n4. Explore the woods",
    max_tokens: 120,
    temperature: 0.7,
    k: 0,
    p: 1,
    frequency_penalty: 0.04,
    presence_penalty: 0.04,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  console.log(`Prediction: ${response.body}`);
  res.json(response.body);
});

// API to get Questions
app.get("/api/questions", async (req, res) => {
  const response = await cohere.generate("xlarge", {
    //Prompt example questions from 'The 36 Questions That Lead to Love' and 'Campfire Games, Questions' from Gander RV
    prompt:
      "This program will generate exciting questions to ask during a campfire.\n\nGiven the choice of anyone in the world, whom would you want as a dinner guest?\n--\nWhat is your favorite song right now, and why? (Or, what should be the theme song to your life right now?)\n--\nWhat was the best thing about today, and why?\n--\nWhat is one thing you learned about yourself recently?\n--\nWhat is a television show (current or past) that you would be willing to live in? Why?\n--\nWho is someone you look up to and would like to emulate? Why\n--\nWhen did you last sing to yourself? To someone else?\n--\nDo you think your social media profiles reflect you accurately?\n--\nWould you like to be famous? In what way?\n--\nDescribe your perfect outdoor adventure.\n--\nWhat is one adventure activity that you would be scared, but willing to try?\n--\nWhat injustices in the world make you angry?\n--\nWhat is your happiest memory?\n--\nWhat are three things on your “bucket-list” or “to do” list before you die?\n--\nShare about a time when you felt the most alive or the most fully yourself.\n--\nIf you could design your dream job, what would it be?\n--\nWho are some people you think are having a positive influence on culture or in our world? Why?\n--\nHow do you go about making a decision? Does it change depending on the weight of the decision?\n--\nWhat is one item you could not live without, and why?\n--\nWhat is the best meal you can cook? If you could have anyone (dead or alive) over for dinner, who would you invite?\n--\nIf you could time-travel to any era in history or the future, what period would you choose and why?\n--\nIf you could learn any skill, what would you choose and why?\n--\nWhat is one life lesson you would like to teach your children?\n--\nWhat is the best advice you ever got?\n--\nFor what in your life do you feel most grateful?\n--\nIf you could wake up tomorrow having gained any one quality or ability, what would it be?\n--\nWhat is the greatest accomplishment of your life?\n--\nWhat is your most treasured memory?\n--\nIs there something that you’ve dreamed of doing for a long time? Why haven’t you done it?\n--",
    max_tokens: 75,
    temperature: 0.8,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  console.log(`Prediction: ${response.body}`);
  res.json(response.body);
});

// API to get Stories
app.get("/api/stories", async (req, res) => {
  const response = await cohere.generate("xlarge", {
    // Scary story prompts from 'Campfire Stories' - Icebreaker Ideas
    prompt:
      "This program will generate the Title of exciting scary stories to tell.\n\nTitle: Do not Visit Lover’s Lane\nStory: A young couple went to the movies, and stopped at the local Lover’s Lane for some kissing. The boy turned on the radio to set the mood. Just as he reaches his arms around his girlfriend, a news bulletin warns of an escaped murderer who has a hook for a right hand. The man had escaped from a facility for the criminally insane.\nThe boy thinks it will be funny to tease his girlfriend to scare her. He begins to tell her he is sure they are in a place the escapee might choose to hide. He goes on and on terrifying his girlfriend. He hoped she would throw herself into his arms for comfort, however his plan backfires. His girlfriend insists they leave right away.\nReluctantly, the boy drives his girlfriend home. When she gets out, she begins yelling and faints. The young man jumps out and runs around the car. There, on her door handle, is a bloody hook!\n--\nTitle: The Unheeded Warning\nStory: A young lady was driving home after a long vacation. Sometime after midnight, a very heavy storm begins as she notices she is almost out of gas. She sees a sign for a gas station and convenience store and pulls off the interstate to fill her tank. The place is obviously open, but deserted, run-down, and old. She almost drives on, but concerned she might run out of gas, decides to stop and just get gas. As she pulls in, a tall man with a badly scarred face comes running through the rain. He pumps her gas and the girl rolls her window down just enough to hand him her credit card. He grabs it and runs back inside.\nThe scarred man comes back, tells her she will have to come inside, because her card was denied, and hurries back inside without allowing her to respond. She really doesn’t want to go inside and considers driving off without paying. However, she decides to go in very quickly, take care of the bill, and leave as soon as possible.\nWhen she gets inside, the man grabs her arm and tries to talk to her. His voice is rough and difficult to understand and she thinks he may have had his voice damaged in whatever accident scarred his face. The man gets increasingly excited and the young girl becomes more frantic. She finally wrests herself from his grip and runs back to her car, leaving the station as quickly as possible. She sees the old man through her back window yelling and gesturing her to come back, but she keeps driving.\nShe turns on the radio to help her relax and sees something move behind her. She looks in the rear-view mirror, just as a man appears in the back seat holding an ax. That is the last thing she sees in this life. The scarred man at the gas station had been trying to warn her.\n--\nTitle: The Killer Under the Bed\nStory: A young girl’s parents were going out for the night. Although she was still young, she thought she was too old for a babysitter. She begs to be allowed to stay home alone, even though her parents will be out very late. She promises to go to bed at her regular bed time and calls her parents on her cellphone just before she settles down for the night to tell them she is fine and not to wake her when they come home. She will see them in the morning.\nShe is almost asleep when she hears dripping noises. She gets up to see if it is raining outside, but the star and moon are shining brightly. She returns to bed, and she as she closes her eyes, she hears the dripping noise again. Her hand is hanging out of bed and she takes comfort when she feels a wet tongue lick it. Knowing their dog is under her bed provides comfort. The dripping noise continue and she finally decides she must know what it is.\nThe young girl gets up and turns on the light. The noise continues and she keeps looking for the source. (At this point, the narrator can stretch the story out, describing various places where she looks, i.e. the hallway, the adjacent bathroom – sink and shower, etc.) Finally, she looks in her closet. There hangs her dog, dripping blood, with a note that says, “Humans lick, too.”\n--\nTitle: Prom Night\nStory: Johnny left his friend’s house late at night and headed home down the dark country roads. It began to rain. Suddenly, Johnny saw the blurry image of a woman in a long, white dress walking down the middle of the road. Johnny had to stop, so he asked the young woman if she needed a ride. Without saying anything, she got in and sat in the front seat. Since she was shivering, Johnny took off his coat and put in over her shoulders.\nAfter a few miles, the girl indicated, again without speaking, that she needed to get out at an old house. Johnny stopped the car and the girl opened the door. Johnny rolled down the window to ask for his coat, but the girl was gone.\nHe left his car and walked to the door. An older woman answered and he explained that he had forgotten to get his jacket from the young woman he had just dropped off at the house. The woman began crying and explained to Johnny that her daughter, on this evening ten years previously, was on the way to her Prom when she was killed in a car accident. She was buried in the cemetery up the road, in the exact spot where Johnny had picked her up.\nThe next day, Johnny drove to the cemetery to confirm the woman’s story. There, on the grave of a young girl, was Johnny’s jacket.\n--\nTitle: A Grave Problem\nStory: Two young girls, Maddy and Sue, were best friends who spent a great deal of time together. Maddy was spending the night at Sue’s house when they decided to tell ghost stories. Maddy told a story she heard from her older brother about how, if you stabbed a knife into a grave, the person buried there will reach out, grab you, and pull you into the grave.\nSue did not believe the story. Maddy agreed, but said she was afraid to try it even it was just a story.\nSue exclaimed, “I am not afraid. I would try it.”\nMaddy called Sue’s bluff, daring her to go to the cemetery down the road and prove that she was not afraid.\nBoth girls went to the kitchen downstairs, where they found a flashlight and a knife. Maddy decided her dare was silly and begged Sue not to go, but Sue wanted to prove the story was a hoax and that she was not afraid. Off she went, into the dark night.\nMaddy sat at the kitchen table waiting for her friend. Fifteen minutes passed, then twenty. Finally, after thirty minutes, Maddy ran to her parent’s bedroom, woke them up, and told them what had happened. She cried in her Mother’s arms as her father grabbed a flashlight and headed towards the cemetery.\nWhen he returned, he was pale and shaken. In a solemn voice, he told Maddy and her mother what he had found. There, on a grave, was Sue, dead with completely white hair. The police were called and after listening to Maddy’s explanation of why Sue was in the graveyard, the investigation determined the death was accidental. When Sue stabbed the knife into the grave, it went through the hem of her nightgown. Thinking she had been grabbed by the person buried there, she died of fright.\n--\nTitle: The Mystery of the Haunted Room\nStory: A young boy, Mike, and his older sister, Julie, were spending the night at the beach house of their aunt and uncle. When Mike was very young and a terrible bed wetter, his parents would put him in the guest room in a crib. The guest room was upstairs, a small room with a small window on the north wall that faced the ocean. There was a double bed in the room, and the boy slept in the middle of the bed. The boy’s parents would put the crib in a corner of the room or against the wall.\nOne night, Mike was awakened by what he thought was a dog barking at the window. He sat up in the middle of the bed, and the barking continued. He looked out the window, but could not see anyone. Suddenly, he turned around and a smiling clown appeared in front of him holding three red balloons.\n--",
    max_tokens: 175,
    temperature: 0.6,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  res.json(response.body);
});

app.get("/api/truth", async (req, res) => {
  const response = await cohere.generate("xlarge", {
    // Truth example prompts from '130+ best truth questions' - Cosmopolitan and 'Truth Game Question List' - ksmb.tistory
    prompt:
      "This program will generate a Truth for the Truth or Dare game.\n\nTruth: What's the worst thing you've ever done at work?\nTruth: When was the last time you cried?\nTruth: What's your biggest fear?\n--\nTruth: What situation are you most afraid of and what trauma do you have?\nTruth: Who's the last person you searched on Instagram?\nTruth: What's something you're glad your family doesn't know about you?\n--\nTruth: Who did you last text?\nTruth: Have you ever been jealous of a friend? For what?\nTruth: What's the worst thing you've ever done?\n--\nTruth: What's the strangest thing you've ever eaten?\nTruth: What's your relationship dealbreaker?\nTruth: What's a secret you've never told anyone?\n--\nTruth: Do you have a hidden talent?\nTruth: Who was your first celebrity crush?\nTruth: What did you last search on Google?\n--\nTruth: What did you want to be while growing up?\nTruth: Do you think you are the attractive person in the room?\nTruth: Have you ever cheated in an exam?\n--\nTruth: What's the most embarrassing thing you've ever done?\nTruth: What's your biggest insecurity?\nTruth: Have you ever stayed friends even though you actually hated them?\n--\nTruth: What's the biggest mistake you've ever made?\nTruth: What's the most disgusting thing you've ever done?\nTruth: Who would you like to kiss in this room?\n--\nTruth: What's one thing you hate people knowing about you?\nTruth: What's the worst thing anyone's ever done to you?\nTruth: What's the best thing anyone's ever done for you?\n--\nTruth: What's the worst thing you've ever said to anyone?\nTruth: Have you ever peed in the shower?\nTruth: What's the strangest dream you've had?\n--\nTruth: Have you ever been caught doing something you shouldn't have?\nTruth: What's the worst date you've been on?\nTruth: What's the best date you've been on?\n--\nTruth: What happened on the latest night out you've ever had?\nTruth: What's your biggest regret?\nTruth: What's the biggest misconception about you?\n--\nTruth: Have you ever said something you regret about someone in this room?\nTruth: What's one thing you wish people knew about you?\nTruth: What is your weirdest habit?\n--\nTruth: Why did your last relationship break down?\nTruth: Have you ever lied to get out of a bad date?\nTruth: What's the most trouble you've been in?\n--\nTruth: What's the worst thing you've ever done to someone else?\nTruth: What's the worst thing you've lied about?\nTruth: What's one thing you wish you'd lied about?\n--\nTruth: What's the best piece of advice you've been given?\nTruth: What's the most you've spent on a night out?\nTruth: Have you ever returned or re-gifted a present?\n--\nTruth: What have you purchased that's been the biggest waste of money?\nTruth: What's your guilty pleasure?\nTruth: What's one thing you only do when you're alone?\n--\nTruth: If you had to get back with an ex, who would you choose?\nTruth: If you had to cut one friend out of your life, who would it be?\nTruth: Do you have a favourite friend?\n--\nTruth: Do you have a favourite sibling?\nTruth: What's the strangest rumour you've heard about yourself?\nTruth: What's your favourite gross food combination?\n--\nTruth: If you could swap lives with someone in this room, who would it be?\nTruth: Tell me about your first kiss\nTruth: What was the most inappropriate time you farted?\n--\nTruth: What's something you really hope your family never finds out about?\nTruth: What's the weirdest lie you've ever told?\nTruth: Do you have any fake social media accounts\n--",
    max_tokens: 120,
    temperature: 0.7,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ["--"],
    return_likelihoods: "NONE",
  });
  res.json(response.body);
});

//Sending Twilio Text Message
app.get("/send-twilio-text", (req, res) => {
  // GET variables, passed via query string, from front-end
  const { phoneNumber, message } = req.query;

  //Create and send text
  client.messages
    .create({
      body: message,
      to: "+1" + phoneNumber,
      from: "+15484884158",
    })
    .then((message) => console.log(message.body));

  res.send(`Send a Twilio Message`);
});
