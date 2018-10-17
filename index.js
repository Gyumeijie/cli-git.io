var https = require('https');
var url = require('url');

// Note that bad hash, e.g. https://github.com/user/repo#readme1, cann't be detected!
function checkGitHubURLValidity(githubUrl, callback, needValidation) {
   if (needValidation) {
      var parsedURL = url.parse(githubUrl); 
      var options = {
         hostname: parsedURL.hostname,
         port: 443,
         path: parsedURL.pathname,
         method: 'HEAD'
      };
   
      var req = https.request(options, function(res) {
         if (res.statusCode === 404) {
            console.log('\033[31mWarning: \033[39m' + '\033[33m' + githubUrl + '\033[39m' + ' is not reachable!');
         } else {
            // 200 or other status are not interested
         }
   
         callback();
      });
      
      req.end();
   } else {
      callback();
   }
}

function shorten(rawURL, callback, check) {

   var needValidation = (check === undefined) ? false : check;
   var encodedURL = 'url=' + encodeURIComponent(rawURL);
   var options = {
      hostname: 'git.io',
      port: 443,
      path: '/create',
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Length': encodedURL.length
      }
   };

   var req = https.request(options, function(res) {
      if (res.statusCode === 200) {
         checkGitHubURLValidity(rawURL, function() {
            var result = '';

            res.setEncoding('utf8');
            res.on('data', function(chunk) {
               result += chunk;
            });
   
            res.on('end', function() {
               result = 'https://git.io/'+result;
               if (typeof callback === 'undefined') {
                  console.log(result);
               } else {
                  callback(result);
               }
            });
         }, needValidation);
      } else {
         console.log('Must be a GitHub.com URL.');
      }
   });

   req.write(encodedURL);
   req.end();

   req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
   });
}

function unshorten(gitDotIoURL, callback) {

   var parsedURL = url.parse(gitDotIoURL);
   var options = {
      hostname: parsedURL.hostname,
      port: 443,
      path: parsedURL.pathname,
      method: 'HEAD'
   };

   var result;
   var req = https.request(options, function(res) {
      // Success 302
      if (res.statusCode === 302) {
         result = res.headers['location'];
      } else {
      // Failure 404, 200 or other status
         console.error('\n' + 
            'Notice: Woops! We can\'t seem to unshorten that URL, this could be for a few reasons:\n\n' +
            '1. it may not be a short URL in the first place;\n' +
            '2. it may not be a real URL or could no longer be active;\n' +
            '3. it may not be a short URL compatible with git.io!'); 
      } 
   });

   req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
   });

   req.on('close', function() {
      if (typeof callback === 'undefined') {
         result === undefined ? undefined : console.log(result);
      } else {
         callback(result);
      }
   });

   req.end();
}

module.exports = {
   shorten: shorten,
   unshorten: unshorten
}