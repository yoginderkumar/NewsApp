# News App

This is a React Native news app that fetches the top 100 news headlines, stores them for offline access, displays them in a dynamic list view, and allows user interaction.

## Features

- Fetch the top 100 news headlines from the News API
- Store headlines in local storage for offline access
- Display a splash screen on app load
- Show a header with the app logo
- Render a list of headlines with source icons, author names, and publish dates
- Allow users to swipe a headline to delete it or pin it to the top of the view
- Pinned headlines stay pinned at the top of the list when the list updates
- Introduce a new batch of up to 5 random headlines to the top of the list every 10 seconds
- Allow users to manually trigger fetching the next batch from local storage and resetting the drip timer
- Reset local storage when all headlines from the current batch have been displayed
- Fetch the next batch of headlines and populate the list view

## Prerequisites

- Node.js (v12 or later)
- React Native development environment (Xcode for iOS, Android Studio for Android)

## Getting Started

1. Clone the repository:

```
git clone https://github.com/your-username/news-app.git
```

2. Install dependencies:

```
cd news-app
npm install
```

3. Obtain a News API key from https://newsapi.org/

4. Create a `.env` file in the project root and add your API key:

```
NEWS_API_KEY=your_api_key_here
```

5. Run the app on your preferred platform:

```
# For iOS
npx react-native run-ios

# For Android
npx react-native run-android
```

## Dependencies

- `@react-native-async-storage/async-storage`: For local storage
- `axios`: For making HTTP requests to the News API
- `react-native-gesture-handler`: For handling swipe gestures

## Contributing

Contributions are welcome! Please create a new branch, make your changes, and open a pull request.
