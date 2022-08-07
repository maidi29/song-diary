export interface TrackFeatures {
    danceability: number,
    energy: number,
    key: number,
    loudness: number,
    mode: number,
    speechiness: number,
    acousticness: number,
    instrumentalness: number,
    liveness: number,
    valence: number,
    tempo: number,
    duration_ms: number,
    time_signature: number
}

export interface DiaryData {
    me: {
        name: string,
        image?: string
    },
    mean: TrackFeatures,
    standardDeviation: TrackFeatures,
    count: number,
    date: string
}