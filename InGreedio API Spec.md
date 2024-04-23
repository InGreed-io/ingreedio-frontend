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

POST /product/{id}/favourite
user authenticated

DELETE /product/{id}/favourite
user authenticated

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

PATCH /users/{id}
```json
{
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

# Panel endpoints
### Products
DELETE panel/products/{id} Admin, moderator or product owner auth

GET panel/products

Admin and moderator can list all products.
Product producer can list only owned products.

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
		"featured": datetime?
	}
]
```

GET panel/products/{id}

Admin and moderator can list all products.
Product producer can list only owned products.

```json
{
	"id": int,
	"name": string,
	"iconUrl": string,
	"rating": float,
	"ratingsCount": int,
	"ingredients": string[],
	"featured": datetime?,
	"companyName": string,
	"description": string,
}
```

POST panel/products
```json
{
	"name": string,
	"ingredients": string[],
	"featured": bool,
	"companyName": string,
	"description": string,
	// TODO: icon image
}
```


PUT panel/products/{id}
```json
{
	"name": string,
	"ingredients": string[],
	"featured": bool,
	"companyName": string,
	"description": string,
	// TODO: icon image
}
```

GET panel/product/{product_id}/reviews
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

## Reviews
DELETE panel/reviews/{id}
Admin or moderator auth

GET panel/reported_reviews/
Admin or moderator auth
```json
[
	{
		"id": int,
		"productId": int,
		"userId": int,
		"username": string,
		"content": string,
		"userRating": float,
		"reviewRatingPercent": float, // +-
	}
]
```

GET panel/reported_reviews/{id}
Admin or moderator auth
```json
[
	{
		"id": int,
		"productId": int,
		"userId": int,
		"username": string,
		"content": string,
		"userRating": float,
		"reviewRatingPercent": float, // +-
		"reports": [
			{
				"userId": int,
				"timestamp": datetime,
			}
		]
	}
]
```

## Users
GET panel/users
Admin and moderator auth
```json
[
  	{
		"id": int,
		"email": string,
		"firstName": string,
		"lastName": string,
		"newsletter": bool,
		"role": string (Role enum),
	}
]
```

GET panel/users/{id}/activity
Admin and moderator auth

pagination + sort
```json
[
  	{
		"timestamp": datetime,
 		"details": string
	}
]
```

POST panel/users/{id}/deactivate
Admin and moderator auth
