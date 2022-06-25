const path = require("path");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const cohere = require("cohere-ai");

require('dotenv').config();

app.use(cors());

cohere.init(process.env.REACT_APP_COHERE_API_KEY);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// API to get Activities
app.get("/api", async (req, res) => {
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
  const response = await cohere.generate('xlarge', { 
    prompt: 'This program will generate exciting questions to ask during a campfire.\n\nWhat is your favorite song right now, and why? (Or, what should be the theme song to your life right now?)\n--\nWhat was the best thing about today, and why? (Everyone can interpret “best” as they wish.)\n--\nWhat is one thing you learned about yourself recently?\n--\nWhat is a television show (current or past) that you would be willing to live in? Why?\n--\nWho is someone you look up to and would like to emulate? Why\n--\nIf you had to get a tattoo (or another), what would you get and why?\n--\nDo you think your social media profiles reflect you accurately?\n--\nHow would you spend $1,000 if you had just one day to spend it?\n--\nDescribe your perfect outdoor adventure.\n--\nWhat is one adventure activity that you would be scared, but willing to try?\n--\nWhat injustices in the world make you angry?\n--\nWhat is your happiest memory?\n--\nWhat are three things on your “bucket-list” or “to do” list before you die?\n--\nShare about a time when you felt the most alive or the most fully yourself.\n--\nIf you could design your dream job, what would it be?\n--\nWho are some people you think are having a positive influence on culture or in our world? Why?\n--\nHow do you go about making a decision? Does it change depending on the weight of the decision?\n--\nWhat is one item you could not live without, and why?\n--\nWhat is the best meal you can cook? If you could have anyone (dead or alive) over for dinner, who would you invite?\n--\nIf you could time-travel to any era in history or the future, what period would you choose and why?\n--\nIf you could learn any skill, what would you choose and why?\n--\nWhat is one life lesson you would like to teach your children?\n--\nWhat is the best advice you ever got?\n--', 
    max_tokens: 75, 
    temperature: 0.8, 
    k: 0, 
    p: 1, 
    frequency_penalty: 0, 
    presence_penalty: 0, 
    stop_sequences: ["--"], 
    return_likelihoods: 'NONE' 
  }); 
  console.log(`Prediction: ${response.body.generations[0].text}`); 
  res.json(response.body);
}); 

string = "\' hello"

// API to get Stories
app.get("/api/stories", async (req, res) => {
  const response = await cohere.generate("xlarge", {
    prompt: 'This program will generate the Title of exciting scary stories to tell.\n\nTitle: Do not Visit Lover’s Lane\nStory: A young couple went to the movies, and stopped at the local Lover’s Lane for some kissing. The boy turned on the radio to set the mood. Just as he reaches his arms around his girlfriend, a news bulletin warns of an escaped murderer who has a hook for a right hand. The man had escaped from a facility for the criminally insane.\nThe boy thinks it will be funny to tease his girlfriend to scare her. He begins to tell her he is sure they are in a place the escapee might choose to hide. He goes on and on terrifying his girlfriend. He hoped she would throw herself into his arms for comfort, however his plan backfires. His girlfriend insists they leave right away.\nReluctantly, the boy drives his girlfriend home. When she gets out, she begins yelling and faints. The young man jumps out and runs around the car. There, on her door handle, is a bloody hook!\n--\nTitle: The Unheeded Warning\nStory: A young lady was driving home after a long vacation. Sometime after midnight, a very heavy storm begins as she notices she is almost out of gas. She sees a sign for a gas station and convenience store and pulls off the interstate to fill her tank. The place is obviously open, but deserted, run-down, and old. She almost drives on, but concerned she might run out of gas, decides to stop and just get gas. As she pulls in, a tall man with a badly scarred face comes running through the rain. He pumps her gas and the girl rolls her window down just enough to hand him her credit card. He grabs it and runs back inside.\nThe scarred man comes back, tells her she will have to come inside, because her card was denied, and hurries back inside without allowing her to respond. She really doesn’t want to go inside and considers driving off without paying. However, she decides to go in very quickly, take care of the bill, and leave as soon as possible.\nWhen she gets inside, the man grabs her arm and tries to talk to her. His voice is rough and difficult to understand and she thinks he may have had his voice damaged in whatever accident scarred his face. The man gets increasingly excited and the young girl becomes more frantic. She finally wrests herself from his grip and runs back to her car, leaving the station as quickly as possible. She sees the old man through her back window yelling and gesturing her to come back, but she keeps driving.\nShe turns on the radio to help her relax and sees something move behind her. She looks in the rear-view mirror, just as a man appears in the back seat holding an ax. That is the last thing she sees in this life. The scarred man at the gas station had been trying to warn her.\n--\nTitle: The Killer Under the Bed\nStory: \nA young girl’s parents were going out for the night. Although she was still young, she thought she was too old for a babysitter. She begs to be allowed to stay home alone, even though her parents will be out very late. She promises to go to bed at her regular bed time and calls her parents on her cellphone just before she settles down for the night to tell them she is fine and not to wake her when they come home. She will see them in the morning.\nShe is almost asleep when she hears dripping noises. She gets up to see if it is raining outside, but the star and moon are shining brightly. She returns to bed, and she as she closes her eyes, she hears the dripping noise again. Her hand is hanging out of bed and she takes comfort when she feels a wet tongue lick it. Knowing their dog is under her bed provides comfort. The dripping noise continue and she finally decides she must know what it is.\nThe young girl gets up and turns on the light. The noise continues and she keeps looking for the source. (At this point, the narrator can stretch the story out, describing various places where she looks, i.e. the hallway, the adjacent bathroom – sink and shower, etc.) Finally, she looks in her closet. There hangs her dog, dripping blood, with a note that says, “Humans lick, too.”\n--\nTitle: Prom Night\nStory: Johnny left his friend’s house late at night and headed home down the dark country roads. It began to rain. Suddenly, Johnny saw the blurry image of a woman in a long, white dress walking down the middle of the road. Johnny had to stop, so he asked the young woman if she needed a ride. Without saying anything, she got in and sat in the front seat. Since she was shivering, Johnny took off his coat and put in over her shoulders.\nAfter a few miles, the girl indicated, again without speaking, that she needed to get out at an old house. Johnny stopped the car and the girl opened the door. Johnny rolled down the window to ask for his coat, but the girl was gone.\nHe left his car and walked to the door. An older woman answered and he explained that he had forgotten to get his jacket from the young woman he had just dropped off at the house. The woman began crying and explained to Johnny that her daughter, on this evening ten years previously, was on the way to her Prom when she was killed in a car accident. She was buried in the cemetery up the road, in the exact spot where Johnny had picked her up.\nThe next day, Johnny drove to the cemetery to confirm the woman’s story. There, on the grave of a young girl, was Johnny’s jacket.\n--\nTitle: A Grave Problem\nStory: \nTwo young girls, Maddy and Sue, were best friends who spent a great deal of time together. Maddy was spending the night at Sue’s house when they decided to tell ghost stories. Maddy told a story she heard from her older brother about how, if you stabbed a knife into a grave, the person buried there will reach out, grab you, and pull you into the grave.\nSue did not believe the story. Maddy agreed, but said she was afraid to try it even it was just a story.\nSue exclaimed, “I am not afraid. I would try it.”\nMaddy called Sue’s bluff, daring her to go to the cemetery down the road and prove that she was not afraid.\nBoth girls went to the kitchen downstairs, where they found a flashlight and a knife. Maddy decided her dare was silly and begged Sue not to go, but Sue wanted to prove the story was a hoax and that she was not afraid. Off she went, into the dark night.\nMaddy sat at the kitchen table waiting for her friend. Fifteen minutes passed, then twenty. Finally, after thirty minutes, Maddy ran to her parent’s bedroom, woke them up, and told them what had happened. She cried in her Mother’s arms as her father grabbed a flashlight and headed towards the cemetery.\nWhen he returned, he was pale and shaken. In a solemn voice, he told Maddy and her mother what he had found. There, on a grave, was Sue, dead with completely white hair. The police were called and after listening to Maddy’s explanation of why Sue was in the graveyard, the investigation determined the death was accidental. When Sue stabbed the knife into the grave, it went through the hem of her nightgown. Thinking she had been grabbed by the person buried there, she died of fright.\n--\nTitle: The Mystery of the Haunted Room\nStory: \nA young boy, Mike, and his older sister, Julie, were spending the night at the beach house of their aunt and uncle. When Mike was very young and a terrible bed wetter, his parents would put him in the guest room in a crib. The guest room was upstairs, a small room with a small window on the north wall that faced the ocean. There was a double bed in the room, and the boy slept in the middle of the bed. The boy’s parents would put the crib in a corner of the room or against the wall.\nOne night, Mike was awakened by what he thought was a dog barking at the window. He sat up in the middle of the bed, and the barking continued. He looked out the window, but could not see anyone. Suddenly, he turned around and a smiling clown appeared in front of him holding three red balloons.\n---\nTitle: The Girl in the Graveyard\nStory: \nA young girl, Melanie, was walking through a cemetery on a hot afternoon. She was following a path between the graves. She had no intention of visiting any of the graves, but she felt compelled to walk along the path. She was not frightened, but she thought the graves looked lonely and sad.\nMelanie continued walking until she came to a very old and large, unmarked grave. She decided to sit down on the grassy area and rest. As she sat, she heard a whisper. She turned around to see an old man with long white hair. The man was dressed in the clothes of a long-forgotten era. He was holding a walking stick. He smiled and said, “Hello, Melanie. I have been waiting for you. I am very old, but I am still very strong. I am looking forward to the day you come to visit me.”\n---',
    max_tokens: 20,
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