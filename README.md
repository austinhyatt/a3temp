[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vxWRKI0Z)
Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Due: February 10th, by 11:59 AM.

This assignment continues where we left off, extending it to use the most popular Node.js server framework (Express), 
a database ([MongoDB](https://www.mongodb.com/)), and a CSS style framework / template of your choice ([Material Tailwind](https://www.material-tailwind.com/),
[MaterialUI](https://mui.com/), [Tailwind CSS](https://tailwindcss.com/), [Mantine](https://mantine.dev), [Shadcn](https://ui.shadcn.com/), etc.).

Baseline Requirements
---

Your application is required to implement the following functionalities:

- a `Server`, created using Express (no alternatives will be accepted for this assignment)
- a `Results` functionality which shows all data, except passwords, associated with a logged-in user
- a `Form/Entry` functionality which allows users to add, modify, and delete data items (must be all three!) associated with their username / account. 
  The authentication is to be implemented using [Passport - Local Strategy](https://www.passportjs.org/packages/passport-local/) 
  which authenticates using a simple username and password. For the purposes of this assignment, you do not have to encrypt
  the password.
- Persistent data storage in between server sessions using [MongoDB](https://www.MongoDB.com/cloud/atlas) (you *must* use MongoDB for this assignment). You can use either the [official MongoDB node.js library](https://www.npmjs.com/package/MongoDB) or use the [Mongoose library](https://www.npmjs.com/package/mongoose), which enables you to define formal schemas for your database. Please be aware that the course staff cannot provide in-depth support for use of Mongoose.  
- Use of a CSS style framework (see possibilities at the beginning of this assignment). 
  This should do the bulk of your styling/CSS for you and be appropriate to your application. 
  For example, don't use [NES.css](https://nostalgic-css.github.io/NES.css/) (which is awesome!) unless you're creating a game or some type of retro 80s site.

Your application is required to demonstrate the use of the following concepts:  

HTML:  
- HTML input tags and form fields of various flavors (`<textarea>`, `<input>`, checkboxes, radio buttons etc.)
- HTML that can display all data *for a particular authenticated user*. Note that this is different from the last assignment, which required the display of all data in memory on the server.

Note that it might make sense to have two pages for this assignment, one that handles login / authentication, and one that contains the rest of your application.
For example, when visiting the home page for the assignment, users could be presented with a login form. After submitting the login form, if the login is 
successful, they are taken to the main application. If they fail, they are sent back to the login to try again. For this assignment, it is acceptable to simply create 
new user accounts upon login if none exist, however, you must alert your users to this fact.  

CSS:  
- CSS styling should primarily be provided by your chosen template/framework. 
Oftentimes a great deal of care has been put into designing CSS templates; 
don't override their stylesheets unless you are extremely confident in your graphic design capabilities. 
The idea is to use CSS templates that give you a professional looking design aesthetic without requiring you to be a graphic designer yourself.

JavaScript:  
- At minimum, a small amount of front-end JavaScript to get / fetch data from the server. 
See the [previous assignment](https://github.com/cs4241-c25/a2-shortstack) for reference.

Node.js:  
- A server using Express and a persistent database (MongoDB).

General:  
- Your site should achieve at least 90% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests 
using Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) (don't worry about the PWA test, and don't worry about scores for mobile devices).
Test early and often so that fixing problems doesn't lead to suffering at the end of the assignment. 

Deliverables
---

Do the following to complete this assignment:

1. Accept the A3 assignment which should automatically create a private repository for you.
2. Implement your project with the above requirements. Consider beginning by converting your A2 
   assignment. First, change the server to use express. Then, modify the server to use MongoDB 
   instead of storing data locally. Last but not least, implement user accounts and login using
   Passport Local Strategy. User accounts and login is a difficult part of this assignment, so
   budget your time accordingly. 
3. Ensure that your project has the proper naming scheme as previous assignments except starting
   with "a3-" so we can find it. 
4. Modify the README to the specifications below.
5. Push your final application to your assignment GitHub repository before the deadline at 11:59pm. 
6. Create an empty, temporary, `public` GitHub repository. Push your final application to this
   repository. 
7. Import from this public repository to deploy on Glitch (unless completing the 
   alternative server technical achievement described below). Fill in the appropriate fields in 
   your package.json file. Delete the public repository after the import has been successful. 
8. Test your project to make sure that when someone goes to your main page on Glitch (or an 
   alternative server), it displays correctly.

Achievements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the 
assignment to your personal interests, for a maximum twenty additional points and a maximum grade of a 100%. 
These are recommended achievements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README, 
why it was challenging, and how many points you think the achievement should be worth. 
ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- (10 points) Implement GitHub authentication using either  [Passport GitHub1](https://www.passportjs.org/packages/passport-github)
  or [Passport GitHub2](https://www.passportjs.org/packages/passport-github2). 
  *You must either use GitHub authentication or provide a username/password to access a dummy account*. 
  Course staff cannot be expected, for example, to have a personal Facebook, Google, or Twitter account to use when grading this assignment. 
  Please contact the course staff if you have any questions about this. THIS IS THE HARDEST ACHIEVEMENT OFFERED IN WEBWARE.
  It is highly recommended that you complete the required Passport Local Strategy first and then attempt this!
- (5 points) Instead of Glitch, host your site on a different service like [Vercel](https://vercel.com/) or [Heroku](https://www.heroku.com).
  Make sure to describe this a bit in your README. What was better about using the service you chose as compared to Glitch? 
  What (if anything) was worse? 
- (5 points) Get 100% (not 98%, not 99%, but 100%) in all four lighthouse tests required for this assignment.
- (up to 5 points) List up to five Express middleware packages you used and a short (one sentence) summary of what each 
  one does. THESE MUST BE SEPARATE PACKAGES THAT YOU INSTALL VIA NPM, NOT THE ONES INCLUDED WITH EXPRESS. So express.json
  and express.static don't count here. For a starting point on middleware, see [this list](https://expressjs.com/en/resources/middleware.html).

*Design/UX*
- (10 points) Make your site accessible using the [resources and hints available from the W3C](https://www.w3.org/WAI/), 
  Implement/follow twelve tips from their [tips for writing](https://www.w3.org/WAI/tips/writing/),
  [tips for designing](https://www.w3.org/WAI/tips/designing/), and [tips for development](https://www.w3.org/WAI/tips/developing/).
  *Note that all twelve must require active work on your part*. 
  For example, even though your page will most likely not have a captcha, you don't get this as one of your twelve tips 
  to follow because you're effectively getting it "for free" without having to actively change anything about your site. 
  Contact the course staff if you have any questions about what qualifies and doesn't qualify in this regard. 
  List each tip that you followed and describe what you did to follow it in your site.
- (10 points) Describe how your site uses the CRAP principles in the [Non-Designer's Design Book](https://learning.oreilly.com/library/view/the-non-designers-design/9780321563088/)
  Make sure you are logged in to Canvas before clicking on the book's link.
Which element received the most emphasis (contrast) on each page? 
How did you use proximity to organize the visual information on your page? 
What design elements (colors, fonts, layouts, etc.) did you use repeatedly throughout your site? 
How did you use alignment to organize information and/or increase contrast for particular elements. 
Write a paragraph of at least 125 words *for each of four principles* (four paragraphs, 500 words in total). 

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title

your glitch (or alternative server) link e.g. http://a3-wilson-wong.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy

## Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative...
