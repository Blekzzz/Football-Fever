# Branded Things App Server
My App will sell branded things. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;


## Restful Endpoints :

#### For Admin & Staff :
- POST '/register'
- POST '/login'
- GET '/news'
- GET '/profiles/:id'
- PUT '/profiles'
- POST '/generate-midtrans-token'
- PATH '/subscribe'
- GET '/table/:league'
- GET '/transfers/:league'
- GET '/squad-detail/:league/:team'
- GET '/matchday/:league'
- PATCH '/unsubscribe'


&nbsp;

### POST /register

> Create new User

_Request Body_
```
{
  "username": "<your username>",
  "email": "<youremail@mail.com>",
  "password": "<your password>",
}
```

_Response (201 - Created)_
```
{
	"message": "Your account has been successfully registered"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<error message>"
}
```

---


### POST /login

> User Login

_Request Body_
```
{
  "email": "<youremail@mail.com>",
  "password": "<your password>",
}
```

_Response (200 - Success Login)_
```
{
	"access_token": "<your_access_token>",
	"id": "<your_id>",
	"membership": <BOOLEAN>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<error message>"
}
```

---

### GET /news

> GET news

_Response (200 - Success Get News Data)_
```
{
	"status": "ok",
	"totalResults": 536,
	"articles": [
		{
			"source": {
				"id": "bbc-news",
				"name": "BBC News"
			},
			"author": null,
			"title": "Transfer latest and football news",
			"description": "Latest news as Arsenal prepare to raise their bid for Declan Rice following Manchester City's interest and Manchester United close on Mason Mount.",
			"url": "https://www.bbc.co.uk/sport/live/football/65995672",
			"urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
			"publishedAt": "2023-06-23T05:58:08Z",
			"content": "How are we all this morning?\r\nReady for another day of transfer speculation?\r\nThere is certainly plenty going on behind the scenes as the summer transfer window cranks into gear.\r\nWill Manchester Cit… [+325 chars]"
		},
		{
			"source": {
				"id": "bbc-news",
				"name": "BBC News"
			},
			"author": "https://www.facebook.com/bbcnews",
			"title": "Kwara boat tragedy: Mothers die trying to save children in Nigeria",
			"description": "More than 100 people drowned when the wooden boat they were using to cross the River Niger capsized.",
			"url": "https://www.bbc.co.uk/news/world-africa-65919230",
			"urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/DEBC/production/_130102075_maria.jpg",
			"publishedAt": "2023-06-15T15:08:33Z",
			"content": "Among the more than 100 people who drowned earlier this week when a boat capsized on the River Niger in central Nigeria were many parents trying to save their children, a survivor tells the BBC.\r\nMoh… [+5276 chars]"
		},
        ....
    ]
}
```

---

### GET /profiles/:id

> GET User Profile By Id

_Request Headers_
```
{
    "access_token": "<your_access_token>"
}
```

_Request Params_
```
{
    "id": "<user_id>"
}
```

_Response (200 - Success Get Profile By Id)_
```
{
	"id": 1,
	"username": "natanja",
	"email": "natanjaja@mail.com",
	"isMembership": false,
	"about": null
}
```

---

### PUT /profiles

> Edit User Profile

_Request Headers_
```
{
    "access_token": "<your_access_token>"
}
```

_Request Body_
```
{
    "username": "<username_input>",
    "about": "<about_you>"
}
```

_Response (200 - Success edit user profile)_
```
{
    "message": "Profile update has been successfully changed"
}
```

---

### POST /generate-midtrans-token

> Generate Midtrans Token For Payment

_Request Headers_
```
{
    "access_token": "<your_access_token>"
}
```

_Response (200 - Success generate midtrans token)_
```
{
	"token": "<midtrans_token>",
	"redirect_url": "<redirected_url>"
}
```

---

### PATCH /subscribe

> Edit User Membership From False Into True

_Request Headers_
```
{
    "access_token": "<your_access_token>"
}
```

_Response (200 - Success edit misMembership into true)_
```
{
    "message": "Thankyou! Membership has been applied"
}
```

---

### GET /table/:league

> GET league table from selected league

_Request Headers_
```
{
    "access_token": "<your_access_token>",
    "membership": true
}
```

_Request Params_
```
{
    "league": "<select_league_from_available_league>"
}
```

_Response (200 - Success Get table league)_
```
[
	{
		"Position": "-",
		"SquadLogo": "https://image-service.onefootball.com/transform?w=21&h=21&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F622.png",
		"Name": "AFC Bournemouth",
		"Points": "0",
		"Played": "0",
		"Winned": "0",
		"Loosed": "0",
		"Tie": "0",
		"Goal Difference": "0"
	},
	{
		"Position": "-",
		"SquadLogo": "https://image-service.onefootball.com/transform?w=21&h=21&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F2.png",
		"Name": "Arsenal",
		"Points": "0",
		"Played": "0",
		"Winned": "0",
		"Loosed": "0",
		"Tie": "0",
		"Goal Difference": "0"
	},
    ....
]
```

---

### GET /transfers/:league

> GET data transfers player from selected league

_Request Headers_
```
{
    "access_token": "<your_access_token>",
    "membership": true
}
```

_Request Params_
```
{
    "league": "<select_league_from_available_league>"
}
```

_Response (200 - Success Get player transfers)_
```
[
	{
		"transferType": "DONE DEAL",
		"transferDate": "Today",
		"playerName": "Theo Corbeanu",
		"playerRole": "Midfielder",
		"oldClub": "Wolverhampton Wanderers",
		"newClub": "Grasshopper Club Zürich",
		"price": "LOAN",
		"renewal": ""
	},
	{
		"transferType": "DONE DEAL",
		"transferDate": "Today",
		"playerName": "Nigel Lonwijk",
		"playerRole": "Defender",
		"oldClub": "Wolverhampton Wanderers",
		"newClub": "Grasshopper Club Zürich",
		"price": "LOAN",
		"renewal": ""
	},
    .....
]
```

---

### GET /squad-detail/:league/:team

> GET squad detail data

_Request Headers_
```
{
    "access_token": "<your_access_token>",
    "membership": true
}
```

_Request Params_
```
{
    "league": "<select_league_from_available_league>",
    "team": "<user_input>"
}
```

_Response (200 - Success Get team detail)_
```
[
	{
		"Position": "-",
		"SquadLogo": "https://image-service.onefootball.com/transform?w=21&h=21&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F155.png",
		"Name": "Borussia Dortmund",
		"Points": "0",
		"Played": "0",
		"Winned": "0",
		"Loosed": "0",
		"Tie": "0",
		"Goal Difference": "0"
	}
]
```

---

### GET /matchday/:league

> GET mathday detail from selected league

_Request Headers_
```
{
    "access_token": "<your_access_token>",
    "membership": true
}
```

_Request Params_
```
{
    "league": "<select_league_from_available_league>"
}
```

_Response (200 - Success GET mathday detail from league selected)_
```
[
	{
		" Matchday 1 ": [
			{
				"homeLogo": "https://image-service.onefootball.com/transform?w=22&h=22&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F275.png",
				"homeTeam": "Burnley",
				"awayLogo": "https://image-service.onefootball.com/transform?w=22&h=22&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F209.png",
				"awayTeam": "Manchester City",
				"MatchDay": "11/08/2023",
				"MatchTime": "19:00"
			},
			{
				"homeLogo": "https://image-service.onefootball.com/transform?w=22&h=22&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F2.png",
				"homeTeam": "Arsenal",
				"awayLogo": "https://image-service.onefootball.com/transform?w=22&h=22&dpr=2&image=https%253A%252F%252Fimages.onefootball.com%252Ficons%252Fteams%252F164%252F577.png",
				"awayTeam": "Nottingham Forest",
				"MatchDay": "12/08/2023",
				"MatchTime": "11:30"
			},
            ....
        ],
        .....
    }
]
```

---

### PATCH /unsubscribe

> GET squad detail data

_Request Headers_
```
{
    "access_token": "<your_access_token>",
    "membership": true
}
```


_Response (200 - Success GET mathday detail from league selected)_
```
    "message": "<Your Subscription has been canceled>"
```

---

# Global Error

_Response (401 - Unauthorized)_
```
{
    "message": "Authentication Error"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message" "Internal Server Error"
}
```
