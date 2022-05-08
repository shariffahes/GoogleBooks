# GoogleBooks
You can find Screenshots of the app in the last part of the file.

# Challenges:
Different challenges arised while implementing the following project due to the fact the project is designed for web code challenge.
1) A separate package was required to implement sign in with google.
2) Embedded view is easy to implement if you are on the web by including the script tag and referring to a google script for that purpose while it is not possible in react native.
3) The download of folder requires to solve captcha first which is another challenge when you want to use react native.
4) Custom animation can be added for later


# Design Code:
## Approach:
- We can use react navigation for the navigation process in react native; however, the project is small and the challenge required to use single page so I implemented a simple switch navigator customed fo our purpose.
- Redux was used for state management.
- For File download, I used rn-fetch-blob
- For google sing, I used @react-native-google-signin package.

## Switcher:
A custom switcher was used for navigation. Here we can use 2 different approach. 
1) The condition Approach:
- isFirstScreen ? children[0] : children[1]

This approach will make us lose the state of the screen which will scroll to the top again and lose the search query. So I choose a different approach to hide the screen with opacity and height.

2) The opacity approach:
This will preserve the state of the grid screen in which user will stay at the same index when return back to the page.

## File Download:
In order to download the book, I used rn-fetch-blob. However the problem is that google require to solve recaptcha to redirect you to download the file.
### Possible approach:
The idea was to use webview to preview the recaptcha and then download the file, but it didn't redirect me again to the grid screen and face some challenge with the following approach.
[Can be discussed later if needed.]

# ScreenShots:
### AuthScreen:
<img src="https://user-images.githubusercontent.com/22710660/167312363-658d87a6-982f-41c6-850f-77a0bbae0b15.png" width="250px" height="500px"/>

### MainScreen:
<img src="https://user-images.githubusercontent.com/22710660/167312408-38222804-17cc-4535-b641-34a278e15e10.png" width="250px" height="500px"/>

### GridScreen:
<img src="https://user-images.githubusercontent.com/22710660/167312448-0088eaa8-f56e-4b66-af11-54c2b3adfed5.png" width="250px" height="500px"/>

### PreviewScreen:
<img src="https://user-images.githubusercontent.com/22710660/167312813-7530cc71-f7a2-4a6e-be8b-52dc627284a6.png" width="250px" height="500px"/>
<img src="https://user-images.githubusercontent.com/22710660/167312540-9a6f3a9f-08fd-4ddc-aeed-a7a8a6e6f628.png" width="250px" height="500px"/>
<img src="https://user-images.githubusercontent.com/22710660/167312555-db94926a-24cc-496a-8944-eb7eb7daba78.png" width="250px" height="500px"/>

