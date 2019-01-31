# new-launch-api

API for New launch PPP and referral dashboard.
## Development

### install depedencies
we use npm shrinkwrap instead npm install, to install all depedencies you can run :
> npm shrinkwrap

### run service with npm
run service on local 
* Create your own connection.js configuration from example.connection.js
> `npm run start:local`

### solve the error for `windows` users
* get error : `MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". To fix this, 1) install the .NET Framework 2.0 SDK, 2) install Microsoft Visual Studio 2005 or 3) add the location of the component to the system path if it is installed elsewhere.`
> solve : install visual studio community, web installer (https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409) or iso file (https://go.microsoft.com/fwlink/?LinkId=615448&clcid=0x409)

* get error : `gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.`
> solve : install python version 2.7.10 (https://www.python.org/ftp/python/2.7.10/python-2.7.10.amd64.msi) and set environment options in environment variable.

### run service locally with docker
* build docker first
> `docker build . -t new-launch-api:latest  --build-arg RUNTIME=local `

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
* End Point for search listing
> `{{hostname}}search/v1/search?pageSize=:limit&nextPageToken=:offset` (POST)

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

### Similar Listing

* End Point similar listing :
> `{base_url}/listing/v1/listings/similar/:listingId` (GET)

* End Point similar listing for agent referral :
> `{{hostname}}listing/v1/listings/similar/referral/:agentId?price=:price` (GET)
