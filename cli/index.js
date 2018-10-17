#! /usr/bin/env node

var githubURL = require('..');
var json = require('../package.json');

function printHelpInfo() {
   console.log('Usage: gitio [ [-v|--version] | [-h|--help] |  [ shorten [--check|-c]|unshorten  <url> ] ]');
}

function shouldBeURL(url) {
   return /https?:\/\//.test(url);
}

function parseArg() {
   var args = process.argv;

   // No options or subcommand provided
   if (args.length === 2) {
      printHelpInfo();
      return;
   }
   
   // Check version option
   var hasVersion = !!((args.indexOf('-v')+1) || (args.indexOf('--version')+1));
   if (hasVersion) {
      console.log(json.version);
      return;
   }

   // Check help option
   var hasHelp = !!((args.indexOf('-h')+1) || (args.indexOf('--help')+1));
   if (hasHelp) {
      printHelpInfo();
      return;
   }

   // If there is subcommand, the length must greater than 4
   if (args.length < 4) {
      printHelpInfo();
      return;
   }

   // And the args[2] must be populated by subcommand
   var subcommand = args[2];
   if (subcommand !== 'shorten' && subcommand !== 'unshorten') {
      printHelpInfo();
      return;
   }

   if (subcommand === 'shorten') {
      // Usage: gitio shorten [-c|--check] <url> OR gitio shorten <url> [-c|--check]
      var check = false;
   
      if (shouldBeURL(args[3])) {
         // gitio shorten <url> OR gitio shorten <url> -c|--check(addtional support)
         if (args[4] === '-c' || args[4] === '--check') check = true;
         githubURL.shorten(args[3], undefined, check);
      } else if (shouldBeURL(args[4])) {
         // gitio shorten -c|--check <url>
         if (args[3] === '-c' || args[3] === '--check') {
            githubURL.shorten(args[4], undefined, true);
         } else {
            printHelpInfo();
         }
      } else {
         printHelpInfo();
      }
   } else {
      // Usage: gitio unshorten <url>
      if (shouldBeURL(args[3])) {
         githubURL.unshorten(args[3]);
      } else {
         printHelpInfo();
      }
   } 
}

parseArg();