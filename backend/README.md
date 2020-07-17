
# Routy Sales

## Dev environment

Clone this repo, and create `.env` file

```bash
git clone git@github.com:zabini/audio-repeater.git
cd audio-repeater
cp .env.example .env
```

Don't forget to set up `.env`, specifically:
- **`APP_DOMAIN`**
- **`DB_*`**

Edit your `hosts` file

```bash
nano /etec/hosts
```

Add the following content to the file
```bash
127.0.0.1       {{"APP_DOMAIN" VALUE MUST BE THE SAME HERE}} # APP_DOMAIN
127.0.0.1       api.{{"APP_DOMAIN" VALUE MUST BE THE SAME HERE}} # api subdomain
```

Then, build the app. PS: user `--no-cache` arg if needed
```bash
docker-compose build
```

Finally, start up the app
```bash
docker-compose up -d
```

Stop the containers. PS: use `-d` arg if want to drop the volumes
```bash
docker-compose down
```
