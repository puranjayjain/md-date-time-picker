Quench

Gulp is a command-line JavaScript task runner that automates your web workflow by way of self-scripted tasks. Quench easily creates those self-scripted tasks based on your custom input.

On quenchjs.com
===============

After selecting your custom "Gulp Options," your gulpfile.js and package.json are automatically created for you in your browser. At this point you have a few options. You can:

1. Copy and paste these files into your own project. Here you'll need to make sure all of your directories are set up properly and then you can continue on to the "Installing Supplemental Files" section.

2. Save these files into your own project. Like copy and paste, you'll need to make sure all of your directories are set up properly and then you can continue on to the "Installing Supplemental Files" section.

3. If you're using a supported browser, you can click the "Save Project as Zip" button to download these and any supplemental files as a Zip file. The Zip file includes gulpfile.js, package.json, as well as an appropriate directory structure and a few starter style files if appropriate. See the "Using the Zip File" section.


Using the Zip File
==================

Download the Zip file and extract it to your desired project location.


Installing Supplemental Files
=============================

For all of this magic to work, your computer needs a few extra files to get Gulp up and running in your project.

You'll need to make sure you have both [Node](http://nodejs.org) and [Gulp](http://gulpjs.com) installed before moving forward. If you already have both, keep on going, and if not, you'll only need to install them once.

Navigate to your project directory using the command line and run the following command:
    npm install

That's it! You're ready to start using Gulp.


Using Gulp
==========

Default Task
------------

    gulp

Running the default task automatically watches your project folders for any changes and runs the accompanying task. For example, if you've elected to run tasks on your JavaScript, anytime you change a JavaScript file gulp will automatically run those tasks, including a browser refresh if you've included BrowserSync.

CSS
---
    gulp styles

Running the gulp styles task will run your selected CSS tasks once.

JavaScript
----------

    gulp scripts

Running the gulp scripts task will run your selected JavaScript tasks once.

Images
------

    gulp images

Running the gulp images task will run your selected image tasks once.

Feedback
========

I'd love to hear your thoughts on Quench, any suggestions you might have, or any bugs you come across. Send all feedback to: feedback@quenchjs.com
