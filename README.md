Polymer Version of heartpoints.org
==================================

# Mission Statement

How many times have you hesitated and then kept on going when coming across someone in need in the streets of
your home city? You feel the need and responsibility to help but pulling money out of your wallet on the spot seems
risky. Moreover, you have no guarantee on how the money would be spent, whether or not it would contribute to the
well-being of the person to whom you gave it.

Heartpoints.org tackles this problem by enabling wireless 1-on-1 donations in the form of heartpoints which can be
used to obtain basic services such as food, clothes and shelter from participating vendors around the city. The people
wishing to receive donations carry a tile emitting a signal that makes individual wireless donations possible via the
heartpoints.org mobile app. This approach makes everyday donations more appealing to a wider group of people and
satisfies the need of knowing who benefits from the donations and how.

# Installation for Development Environment

First, install the "git" program on your computer. Next use it to
pull down a clone of the shared github workspace. This is a place where 
we keep the shared code for the website:

    git clone https://github.com/heartpoints-org/heartpoints.org.git
    
Next, you need the npm / node.js runtime to execute the code. Install
that by going to https://nodejs.org/en/. Follow the installation
instructions for your Operating System. Once you have npm installed,
you can perform the following command to fully install the 
heartpoints.org website by going into :

    npm install
    
# Start the Development Server

To run a web server on your local computer, so that you can see it
in a browser as you make changes, simply run the following command:

    npm start
    
This will run a web server, and it will open a browser window and
automatically direct you to the development webserver.

As you make changes, it will automatically refresh the browser to
reflect those changes.

# Running the Legacy Web Server

The legacy web server is what runs the current heartpoints.org website. 
It is a heroku-ready app that starts with the command defined in
the Procfile (in the root directory). To run it locally, run the following
command:

    npm run legacy-server