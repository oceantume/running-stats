# Running Stats

This is a simple web app that aims to provide a few experimental tools powered by a run tracker's API. [Strava](https://www.strava.com) is the only platform supported at the moment.

https://oceantume.github.io/running-stats

## Strava API Access

This app has no back-end of its own. Because of this, all users will need to [create their own API client on Strava](https://www.strava.com/settings/api). The client id and secret are then entered in the app so that the user can authorize the app on their account, allowing it to access the Strava API. These credentials and any data retrieved from Strava will only be stored in the browser using IndexedDB and will never be sent anywhere else.

## Strava API Agreement

Please [read the Strava API Agreement](https://www.strava.com/legal/api) before entering your client id and secret into the application. The creator(s) of this software are not responsible for what you do with it and are not to be held accountable if Strava revokes your access to their API if they were to judge that this is not a correct use of it. Note that no data retrieved from the API will be stored anywhere other than on the browser for caching purposes.

## Backlog and ideas

- **Personal records list**: Strava shows you when you break a personal record for a given distance, but it doesn't seem to offer a useful list of those.
- **Personal records by splits**: Strava divides runs in splits of around 1km. Those splits could be ranked against each other independently of which run they belong to.
- **More map visualizations**: There are probably a lot of interesting visuals that can be created for a single run or using someone's entire run history.
