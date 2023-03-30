# AlumniNetworkClient

AlumniNetworkClient is front-end part of Alumni Network Portal. Its primary task is enable communication between Experis and Noroff Alumnis. 

With the Alumni Network Portal candidates are able to create and manage threads and comment them, create and join events, create and join topics and groups, see user details, display own activity on user dashboard.

AlumniNetworkClient is created with React.

## Technologies used

* React
* MUI
* Redux
* Axios

## Folder Structure
```
.
|   .env
|   .env.example
|   .eslintrc.js
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   
+---public
|   |   favicon.ico
|   |   index.html
|   |   keycloackproduct.json
|   |   keycloak.json
|   |   manifest.json
|   |   robots.txt
|   |   
\---src
    |   App.js
    |   index.js
    |   keycloak.js
    |   
    +---components
    |   |   KeycloakRoute.js
    |   |   SignIn.js
    |   |   
    |   +---calendar
    |   |       Calendar.js
    |   |       CalendarDrawerView.js
    |   |       CalendarInfo.js
    |   |       
    |   +---navigationBar
    |   |       NavBar.js
    |   |       NavMenu.js
    |   |       
    |   +---pages
    |   |   +---Calendar
    |   |   |       CalendarPage.js
    |   |   |       
    |   |   +---event
    |   |   |       CreateEventPage.js
    |   |   |       
    |   |   +---group
    |   |   |       CreateGroup.js
    |   |   |       Group.js
    |   |   |       GroupList.js
    |   |   |       
    |   |   +---post
    |   |   |       CreatePostForm.js
    |   |   |       EditPostForm.js
    |   |   |       
    |   |   +---timeline
    |   |   |       Timeline.js
    |   |   |       
    |   |   +---topic
    |   |   |       CreateTopic.js
    |   |   |       Topic.js
    |   |   |       TopicList.js
    |   |   |       
    |   |   \---userDasboard
    |   |           UserDashboard.js
    |   |           
    |   +---profile
    |   |       EditProfile.js
    |   |       profile.js
    |   |       
    |   +---templateSites
    |   |   +---detailList
    |   |   |       CommentPost.js
    |   |   |       DetailsList.js
    |   |   |       EventCard.js
    |   |   |       GroupTopicCard.js
    |   |   |       JoinOrLeave.js
    |   |   |       
    |   |   \---groupTopicList
    |   |           CreateGroupTopic.js
    |   |           GroupTopicList.js
    |   |           
    |   \---threads
    |           EventDetails.js
    |           Post.js
    |           Thread.js
    |           
    +---reducers
    |       authenticationSlice.js
    |       currentPageSlice.js
    |       eventsSlice.js
    |       groupsSlice.js
    |       postsSlice.js
    |       topicsSlice.js
    |       userSlice.js
    |       
    +---services
    |   +---event
    |   |       eventService.js
    |   |       
    |   +---group
    |   |       groupsTopicsService.js
    |   |       
    |   +---post
    |   |       postService.js
    |   |       
    |   \---user
    |           UserCRUDOperations.js
    |           UserService.js
    |           
    +---store
    |       store.js
    |       
    \---utils
            config.js
            localization.js
            simpleErrorHandler.js
```

## Authors
[@Marco A](https://github.com/DeferredMonk)
[@Jesperi K](https://github.com/jespetius)
[@Heidi J](https://github.com/HeidiJoensuu)
[@Kirsi T](https://github.com/KipaTa)

## Sources
Project was an assignment done during education program created by Noroff Education
