# UWEX Branding Utilities
University of Wisconsin Extended Campus branding utilities contain an email signature generator and a business card request form. Both are built with HTML, CSS, and JavaScript. The business card request form also requires PHP scripts for sending emails to the recipient in charge of managing the request intakes.  

This project's development environment requires [Webpack](https://webpack.js.org/) for asset bundling and dependency management. [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) (version 4.6.2) is used for formatting the HTML pages. CSS files are written and compiled with [SASS](https://sass-lang.com/), a CSS preprocessor. [jQuery](https://jquery.com/) is used in place of JavaScript.

Note the following files are part of Webpack configurations for development purposes:
- `package.json` — contains the project metadata and specifies the desired dependency packages and their versions.
- `package-lock.json` — contains the exact version of the installed dependency packages.
- `webpack.common.js` — contains the majority of configurations that apply to both dev and prod build.
- `webpack.dev.js` — contains configurations for the dev preview with Webpack dev/live server.
- `webpack.prod.js` — contains configurations for production build.
- `postcss.config.js` — specifies the Autoprefixer plugin for the PostCSS Loader.

For production, a distribution (`dist`) or build must be generated before uploading to the web server. To generate this `dist` directory, run the `npm run build` command in the terminal.

Example of the `dist` folder file structure:
```
|-- index.html
|-- business-card.html
|-- email-signature.html
|-- css/
|  |-- card.css
|  |-- common.css
|  |-- email.css
|-- images/
|  |-- back.png
|  |-- favicon.ico
|  |-- front.png
|  |-- logo.jpg
|  |-- preview_logo.png
|  |-- uwex-logo.svg
|-- scripts/
|  |-- card.js
|  |-- common.js
|  |-- email.js
|  |-- secret.php
|  |-- send.php
```
## PHP Files
### The send.php File
The `send.php` file contains the script to send an email to the requestee and a confirmation email to the requestor. It also includes the email templates for both messages.

### The secret.php File
As its name suggested, the `secrect.php` file contains secrets. This PHP file is unavailable on GitHub; however, in its place, the `secret.dist.php` file is available for reference. It is highly recommended not to share this file publicly as it contains sensitive keys and information. When ready, copy this `secret.dist.php` and name it without the `dist` in the file name. Edit the [PHP constants](https://www.php.net/manual/en/language.constants.php) in this file appropriately with the following:
- `RECAPTCHA_KEY` — this can be obtained from [Google reCAPTCHA](https://www.google.com/recaptcha/about/). Google reCAPTCHA would mitigate bots and lower the chance of spam being delivered to the recipient.
- `EMAIL_RECIPIENT_NAME` — the name of the recipient who is in charge of business card request intakes.
- `EMAIL_RECIPIENT` — the recipient's email address to send the business card request.
