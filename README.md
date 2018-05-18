# new-launch-api

API for New launch PPP and referral dashboard.
## Development
### run service with npm
run service on local 
> `npm run start:local`

### run service with docker
* build docker first
> `docker build . -t new-launch-api:latest`
* running docker 
> `docker run -t -d -p 9000:9000 --name container_newlaunch new-launch-api:latest`

## End Point
List end point for new launch api

### Diagnostic
* End point for Checking service is up :
> `{base_url}/status/heartbeat` (GET)

### Listing
* End point for getting listing by id : 
> `{base_url}/listing/v1/listings/:id` (GET)

### Article
* End point for getting article related listing by id :
> `{base_url}/v1/articles/categories/primary-pdp` (GET)

### Amenities
* End point for getting project access related listing by id :
> `{base_url}/v1/amenities/:id` (GET)

### Organisation
End point for getting all project by organisation id :
> `{base_url}/v1/organisations/:id/projects` (GET)

### Referrals
* End Point for applying referral listing by id :
> `{base_url}/v1/referrals/listings/:listingId/apply` (POST)

* End Point for approving request referral listing  :
> `{base_url}/v1/referrals/listings/:listingId/listers/:listerId` (POST)

* End Point for rejecting referral listing by id :
> `{base_url}/v1/referrals/listings//:listingId/listers/:listerId/deny` (PUT)

* End Point for removing referral listing by id :
> `{base_url}/v1/referrals/listings/:listingId/listers/:listerId` (DEL)

* End Point for getting status referral listing by id :
> `{base_url}/v1/referrals/listings/:listingId/status` (GET)

* End Point for getting all listing referral :
> `{base_url}/v1/referrals/listings/listers` (GET)