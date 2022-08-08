import type {TrackFeatures} from "@/model/diaryData";

export const getKeyword = (mean: TrackFeatures): string => {
    const max = Math.max(
        mean.danceability,
        mean.valence,
        mean.acousticness,
        mean.energy,
        mean.instrumentalness,
        mean.liveness,
        mean.speechiness);
    const index = Object.values(mean).findIndex((value)=> value === max);
    const key = Object.keys(mean)[index];
    let keyword = 'random';
    switch (key) {
        case 'danceability':
            keyword = 'Party';
            break;
        case 'valence':
            keyword = "happy";
            break;
        case 'acousticness':
            keyword = "relax";
            break;
        case 'speechiness':
            keyword = "cool";
            break;
        case 'instrumentalness':
            keyword = "sad";
            break;
        case 'liveness':
            keyword = "live";
            break;
        case 'energy':
            keyword = "energetic";
            break;
        default:
            break;
    }
    return keyword;
}