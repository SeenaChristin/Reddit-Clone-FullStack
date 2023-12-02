# Reddit-Clone

DB Schema

users
├── user_id_1 - Primary Key
│ ├── username
│ ├── email
│ └── other_user_info
├── user_id_2
│ ├── username
│ ├── email
│ └── other_user_info
└── ...

subreddits
├── subreddit_id_1 - Primary Key
│ ├── name
│ └── user_id
├── subreddit_id_2
│ ├── name
│ └── user_id
└── ...

posts
├── post_id_1 - Primary Key
│ ├── title
│ ├── content
│ ├── user_id
│ ├── subreddit_id
│ └── createdAt: dateTimeStamp
│  
├── post_id_2
│ ├── title
│ ├── content
│ ├── user_id
│ ├── subreddit_id
│ └── createdAt: dateTimeStamp

comments
├── comment_id_1 - Primary Key
│ ├── text
│ ├── author_id
│ ├── post_id
│ └── createdAt: dateTimeStamp
│  
├── comment_id_2
│ ├── text
│ ├── author_id
│ ├── post_id
│ └── createdAt: dateTimeStamp  
│  
└── ...

votes
├── post_votes
│ ├── post_id_1
│ │ ├── user_id_1: 1 // 1 for upvote,-1 downvote
│ │ │ ├── createdAt : dateTimeStamp
│ ├── post_id_2
│ │ ├── user_id_1: 1
│ │ │ ├── createdAt : dateTimeStamp
│ │ ├── user_id_2: -1
│ ├── createdAt : dateTimeStamp
│
├── comment_votes
│ ├── comment_id_1
│ │ ├── user_id_1: 1
│ │ │ ├── createdAt : dateTimeStamp
│ │ │── user_id_2: -1
│ │ ├── createdAt : dateTimeStamp
│ │
├── comment_votes
│ ├── comment_id_1
│ │ ├── user_id_1: 1
│ │ │ ├── createdAt : dateTimeStamp
│ │ │── user_id_2: -1
│ │ ├── createdAt : dateTimeStamp
│
......
