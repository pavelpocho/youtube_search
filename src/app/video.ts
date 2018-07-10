export class Video {
    kind: String;
    etag: String;
    id: Id;
    snippet: Snippet;
}

class Snippet {
    publishedAt: Date;
    channelId: String;
    title: String;
    description: String;
    thumbnails: Thumbnails;
    channelTitle: String;
    liveBroadcastContent: String;
}

class Thumbnails {
    default: Thumbnail;
    high: Thumbnail;
    medium: Thumbnail;
}

class Id {
    kind: String;
    videoId: String;
    channelId: String;
    playlistId: String;
}

class Thumbnail {
    url: String;
    width;
    height;
}