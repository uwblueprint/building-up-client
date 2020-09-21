provider "heroku" {
  version = "~> 2.0"
  email   = var.heroku_account_email
  api_key = var.heroku_api_key
}

resource "heroku_app" "default" {
  name   = "building-up-client"
  region = "us"
}
