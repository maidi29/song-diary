export enum MOOD {PLEASED, HAPPY, EXCITED, MAD, ANGRY, NERVOUS, SAD, BORED, SLEEPY, CALM, PEACEFUL, RELAXED}

export const MOODS: Record<MOOD, string[]> = {
    [MOOD.PLEASED]: ["pleased", "delighted", "grateful", "content", "satisfied", "gratified", "gleeful", "proud", "comfortable", "fulfilled", "complacent"],
    [MOOD.HAPPY]: ["happy","cheerful","overjoyed","glad", "merry", "jubilant", "blissful", "jolly", "carefree","ecstatic", "elated", "euphoric", "passionate"],
    [MOOD.EXCITED]: ["excited", "peppy", "perky", "spirited", "jaunty","lively", "playful", "animated", "motivated","aroused", "juiced up", "uplifting", "energetic", "motivated", "vibrant"],
    [MOOD.MAD]: ["mad", "psychotic", "insane", "crazy", "lunatic", "unhinged", "manic", "over the edge", "frantic", "deranged","bananas"],
    [MOOD.ANGRY]: ["angry", "enraged", "heated", "furious", "irate", "offended", "outraged", "affronted", "galled", "inflamed", "exasperated","annoyed", "sullen", "grumpy"],
    [MOOD.NERVOUS]: ["nervous", "shaky", "afraid", "hysterical", "hesitant", "edgy", "weak", "uptight", "uneasy", "tense", "irritable", "concerned", "jittery", "apprehensive", "doubtful"],
    [MOOD.SAD]: ["sad", "bitter", "heartbroken", "mournful", "pessimistic", "unhappy", "sorrowful", "somber", "melancholic", "wistful", "depressed", "dark", "blue", "gloomy", "down", "grieved", "low", "rejected"],
    [MOOD.BORED]: ["bored", "impatient", "disgusted", "dull", "blasé", "sick and tired", "turned off", "spiritless", "inattentive"],
    [MOOD.SLEEPY]: ["sleepy", "weary", "exhausted", "fatigued", "drained", "overworked", "jaded", "worn", "tired", "dulled", "used-up", "worn-out", "drowsy", "lethargic", "listless", "quiet", "sluggish", "asleep", "heavy", "blah", "slow", "snoozy", "draggy"],
    [MOOD.CALM]: ["calm","thoughtful", "cool", "mild", "placid", "serene", "low-key", "smooth", "tranquil", "restful"],
    [MOOD.PEACEFUL]: ["peaceful","amicable", "neutral", "bloodless", "nonviolent", "peace-loving", "harmonious", "gentle", "easeful", "halcyon"],
    [MOOD.RELAXED]: ["relaxed", "breezy", "nonchalant", "carefree", "casual", "laid-back", "spontaneous", "easygoing", "lighthearted", "sunny", "airy"]
}
export const volatileMoodsHighArousal = ["volatile", "buoyant", "bouncy", "floating", "elusive", "ambiguous", "vague", "enigmatic", "undetermined", "indistinct", "slippery", "shifty"];
export const volatileMoodsLowArousal = ["volatile", "buoyant", "floating", "elusive", "ambiguous", "vague", "muddy", "enigmatic", "undetermined", "indistinct", "shadowy", "slippery", "shifty", "chaotic"];
export const constantMoodsHighArousal = ["unchanging", "steady", "offhand"];
export const constantMoodsLowArousal = ["unchanging", "steady", "calm", "tranquil", "perfunctory", "superficial", "uninvolved"];
export const temperamentalMoodsPositive = ["temperamental", "capricious", "careless", "unpredictable", "unstable", "kinky", "up and down", "impulsive", "quirky", "random"];
export const temperamentalMoodsNegative = ["temperamental", "capricious", "careless", "unpredictable", "unstable", "up and down", "impulsive", "random", "confused", "unbalanced"];
export const stableMoodsPositive = ["predictable", "reliable", "easygoing", "even-tempered", "collected", "mild"];
export const stableMoodsNegative = ["predictable", "reliable", "uninterested", "indifferent", "disinterested", "distant", "senseless"];