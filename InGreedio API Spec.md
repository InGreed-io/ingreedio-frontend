### Categories
GET /categories
```json
[
	{
		"id": int,
		"name": string,
	}
]
```

### Ingredients
GET /ingredients
	1. query - search phrase (string)
	2. page - int (from 0)
	3. limit - int 
```json
[
	{
		"id": int,
		"name": string,
	}
]
```

### Products
GET /products
Query params:
1. query - search phrase (string)
2. categoryId - id (int?)
3. ingredients - array of ids (ints)
4. preferenceId - id of user preference (available if logged in) (int?)
5. sortBy - ["featured", "rating", "ratingCount", "bestMatch"]
6. page - int (from 0)
7. limit - int
```json
[
	{
		"id": int,
		"name": string,
		"iconUrl": string,
		"rating": float,
		"ratingsCount": int,
		"featured": bool,
		"favourite": bool?,
	}
]
```

GET /products/{id}
```json
{
	"id": int,
	"name": string,
	"iconUrl": string,
	"rating": float,
	"ratingsCount": int,
	"ingredients": string[],
	"featured": bool,
	"favourite": bool?,
	"companyName": string,
	"description": string,
}
```

POST /products (for product producer)
```json
{
	"id": int,
	"name": string,
	"iconUrl": string,
	"rating": float,
	"ratingsCount": int,
	"ingredients": string[],
	"featured": bool,
	"favourite": bool?,
	"companyName": string,
	"description": string,
}
```

GET /product/{product_id}/reviews
Query params:
1. page - int (from 0)
2. limit - int
```json
[
	{
		"id": int,
		"username": string,
		"content": string,
		"userRating": float,
		"reviewRatingPercent": float, // +-
	}
]
```

POST /product/{product_id}/reviews
user authenticated
```json
{
	"content": string,
	"userRating": float,
}
```
### Reviews
PATCH /reviews/{review_id}/report
no body

PATCH /reviews/{review_id}/rate
```json
{
	"rating": int(1|5),
}
```

PUT /reviews/{id}
```json
{
	"content": string,
	"userRating": float,
}
```

GET /users/{user_id}/reviews
	Moderator can access all, user only its own, anonymous nothing
```json
[
	{
		"id": int,
		"username": string,
		"content": string,
		"userRating": float,
		"reviewRatingPercent": float, // +-
		"productId": int,
	}
]
```

### User profile
GET /users/{id}
```json
{
	"id": int,
	"email": string,
	"firstName": string,
	"lastName": string,
	"newsletter": bool,
}
```

### Preferences
GET /users/{id}/preferences
```json
[
	{
		"id": int,
		"name": string,
		"preferredIngredients": [
			{
				"id": int,
				"name": string,
			}
		],
		"prohibitedIngredients": [
			{
				"id": int,
				"name": string,
			}
		]
	}
]
```

PATCH /preferences/{preference_id}/ingredients
```json
{
	"id": int,
	"prohibited": bool,
}
```

PATCH /preferences/{preference_id}/ingredients/{id}/delete

DELETE /preferences/{id}