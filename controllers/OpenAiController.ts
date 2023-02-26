const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports.generate = async (
  randomSongName: string,
  moods: string,
  name: string,
  res
): Promise<{ diaryEntry: string; imageUrl: string }> => {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured.",
      },
    });
    return;
  }

  try {
    console.log(moods);
    let diaryEntry = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generateDiaryEntryPrompt(moods),
      temperature: 1,
      max_tokens: 2048,
    });
    console.log(JSON.stringify(diaryEntry));
    diaryEntry = diaryEntry.data.choices[0].text.replace(
      /xxx/gi,
      `${name.split(" ")[0]}`
    );
    diaryEntry = diaryEntry.replace(
      "Sincerely,",
      `\nMotto of the day: ${randomSongName}. \nSincerely,`
    );

    const imageUrl = await this.generateImage(randomSongName);
    console.log(imageUrl);
    return {
      imageUrl,
      diaryEntry,
    };
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
};

module.exports.generateImage = async (randomSongName: string) => {
  let imageUrl = "";
  try {
    /* const response = await openai.createImage({
      prompt: randomSongName,
      n: 1,
      size: "512x512",
    });
    imageUrl = response.data.data[0].url;
  } catch (error) {*/
    const response = await (
      await fetch(
        `https://api.unsplash.com/photos/random?query=${randomSongName}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
      )
    ).json();
    console.log(response);
    imageUrl = response.urls.thumb;
  } catch (error) {}
  return imageUrl;
};

function generateDiaryEntryPrompt(moods) {
  return `
  Generate a diary entry from the following moods and assume reasons for these emotions. Start with 
  "Dear Diary," and end with "Sincerely, xxx".
  
  Moods: Relaxed, Calm, Thoughtful, Sad
  Diary Entry: Dear Diary,
  Today I am feeling a combination of relaxed, calm, thoughtful, and a bit sad. I think these feelings have come on due to the difficult decision I was recently faced with. It was an incredibly tough decision to make, but I eventually did make it, and I'm trying to move past it the best I can and maintain my sense of peace.
  I appreciate all of the advice and support from my friends and family who have been here for me through this difficult time. It's been a great help and I now feel comfortable with the choice I made knowing it was the right one for me.
  Although I'm grateful for the feeling of calm and relaxed, I can't help but feel a mix of sadness and thoughtfulness that comes with the memories of what could have been.
  Tomorrow is a new day, and I'm looking forward to taking some time to enjoy the peacefulness around me.
  Sincerely,
  xxx

  Moods: ${moods} 
  Diary Entry:`;
}

/*
Moods: Uplifting, Energetic, Motivated, Vibrant
Diary Entry:
Dear Diary,

Today I am feeling incredibly uplifting, energetic, motivated, and vibrant. I realized how much I have been neglecting my passions, and I am ready to take them on full force.

I started out the day ruminating on a few of my goals and ambitions. From there, I launched my day with the intention of creating a plan t
o get one step closer to achieving them. I made a list of simple tasks to start with, and I'm feeling excited about each and every one of them.

Not only am I motivated to accomplish my achievable goals and go after things that excite me, I'm also eager to meet new people, gain and share knowledge, and progress with each step.

All in all, it's a beautiful day to get started and I'm looking forward to everything this journey will offer!

Sincerely,
xxx

Excited, Energized, Motivated, Passionate

Dear Diary,

Today I am feeling incredibly excited, energized, motivated, and passionate. I have been filled with a renewed enthusiasm and enthusiasm for life and the countless possibilities that it may bring.

The thought of taking the steps towards my dreams has filled me with such determination and joy. I feel focused, inspired and more determined than ever to make a change and build something that is truly meaningful to me.

The idea of carving out a path and paving a way for myself fills me with immense excitement. I know that this is my journey to take, and I am ready to do everything I can to make it happen and bring my dreams to life.

Things are looking up, and I am ready to take on whatever comes my way!

Sincerely,
xxx
*/
