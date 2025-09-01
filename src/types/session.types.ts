import 'express-session';

declare module 'express-session' {
  interface SessionData {
    viewedPosts?: string[];
    likedPosts?: string[];
  }
}
