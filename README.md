# Bird-Watcher-Grant-Website

<div align="center">
<img src="https://user-images.githubusercontent.com/64297072/231572375-a45f6252-b1a1-4982-82b5-86b757f8cc1a.png">
</div>

# Table of Contents
* [Team Members](#team)
* [About](#about)
* [Website Demo](#slideshow)
* [Technology Used](#made-with)
* [Milestone Timeline](#timeline) 
* [Testing](#Testing) 
* [Deployment](#Deployment)
* [Firebase Hosting Deployment](#instructions)

<div align="center">
<img src="https://user-images.githubusercontent.com/64297072/231564325-c420f3ae-6294-4926-862f-6d9799530217.png" width="350" height="350">
</div>


<a name="team"></a>
## Team Members

* Jason Alvarado
  * jasonalvarado@csus.edu

* Johnathan Valencia
  * johnathanvalencia@csus.edu

* Kaitlyn Yu
  * kyyu@csus.edu

* Ethan Lee
  * ethanlee@csus.edu

* Angelina Castillo
  * rosecastillo@csus.edu 

* Peter Metz
  * pmetz@csus.edu

* Andrew Au
  * andrewkhaiau@csus.edu

* Tory Petersen
  * torypetersen@csus.edu


<a name="about"></a>
## About

The project is a second website for the San Joaquin Audubon Society to advertise youth scholarships/grants and allow users to apply for the grants. Admins can also search through applications and vet the ones they may accept. 



<a name="slideshow"></a>
## Website Demo

### User Side
![userSide3](https://github.com/kaaiiy/Bird-Watcher-Grant-Website/assets/64297072/14a2491a-dbe5-4555-82f8-a680e59230d0)

### Admin Side
![adminSide3](https://github.com/kaaiiy/Bird-Watcher-Grant-Website/assets/64297072/d98b77a5-d5a3-432e-8dcf-cbf324a41749)


A visual showcase of the San Joaquin Audubon Society’s Bird Watcher Grant Website


<a name="made-with"></a>
## Technology Used

### Frontend

<div id="image-table">
    <table>
	    <tr>
    	    <td style="padding:10px">
        	    <img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" width="100"/>
      	    </td>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" width="100"/>
            </td>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" width="100"/>
            </td>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" width="100"/>
            </td>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="100"/>
            </td>
	    <td style="padding:10px">
            	<img src="https://github.com/kaaiiy/Bird-Watcher-Grant-Website/assets/64297072/d7b55680-dd79-463d-a1e0-eaf69621aa71" width="100"/>
            </td>
        </tr>
    </table>
</div>

### Backend
<div id="image-table">
    <table>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" width="100"/>
            </td>
        </tr>
    </table>
</div>

### Database

<div id="image-table">
    <table>
	    <tr>
    	    <td style="padding:10px">
        	    <img src="https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png" width="100"/>
      	    </td>
        </tr>
    </table>
</div>

### Misc
<div id="image-table">
    <table>
	    <tr>
    	    <td style="padding:10px">
        	    <img src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" width="100"/>
      	    </td>
            <td style="padding:10px">
            	<img src="https://user-images.githubusercontent.com/25181517/183912952-83784e94-629d-4c34-a961-ae2ae795b662.png" width="100"/>
            </td>
        </tr>
    </table>
</div>

<a name="timeline"></a>
## Milestone Timeline 

### Sprint 2
* Creating the UI for the website


### Sprint 3
* Fixing the CSS
* Making the website responsive for different devices


### Sprint 4
* Standardize the UI of the website


### Sprint 5
* Register and Login Functionality (admin and user)
* Forgot Password Functionality (admin)
* Application Submission Functionality
* Unique Visitor Counter
* Connect to Database


### Sprint 6
* Logout Functionality
* View Past Submissions and Submission Status (user)
* File Upload on Applications
* Application Grading and Comments (admin)
* Admin Search Function
* Update UI with New Images


### Sprint 7
* “Send An Update” Function
* Connect Past Submissions to Actual Submissions
* Add a New Grant to Website
* New Application for New Grant
* Lock Function for User Submissions
* Replaced Placeholder Text on Homepage
* Improved UI for Admin comments
* Link User ID to their Submissions


### Sprint 8
* “Email Users” function
* Set Unique Statuses for User Submissions
* Write Unique Comments and Grades for User Submissions
* Admin can Lock Submissions from Admin Portal
* Resubmissions for User Applications


### Sprint 9
* UI Adjustments and Fixes
* Update UI with New Images and Text
* Display Lock State for Admins



<a name="Testing"></a>
## Testing
This section will show how we test our website

### Prerequisites:
1. Working local copy of the project.
2. Access to the associated Google account (which was given to the client).
3. Open your Command Prompt/Terminal.
4. Install necessary tools and dependencies by using the following commands:
	* ***npm install cypress --save-dev***
	* ***npm install -g firebase-tools***
5. Firebase Setup:
	* Log into Firebase using the Google account through the terminal by using the command: ***npx firebase login***
	* Initialize Project: ***firebase init***
	* Select "**Hosting: Configure files for Firebase Hosting…**" using the spacebar and then press Enter.
	* Choose “**Use an existing project**” and then hit Enter.
	* Select “**team-pwd (team-pwd)**” and then press Enter.
	* Set the public directory as “**build**”.
	* Answer the next two questions with “**N**” and then hit Enter.
	* Prepare the application by using the command: ***npm run build***

### Manual Testing:
1. Serve the application locally to test: ***npx firebase serve***

### Automated Cypress Testing and Unit Testing:
1. Serve the application locally: ***npx firebase serve***
2. In a separate terminal, open Cypress: ***npx cypress open***
3. Navigate to “**e2e testing**”, choose the browser you want, and select the desired .cy.js file(s) for automated tests.

<a name="Deployment"></a>
## Run and Deploy

### Run
To set up and run the Bird Watcher Grant Website locally:
1. Clone the project from Github to your local machine using the following command: ***git clone https://github.com/kaaiiy/Bird-Watcher-Grant-Website.git***
2. After cloning, navigate to the main directory of the project: ***cd Bird-Watcher-Grant-Website***
3. Install Dependencies:
	* The project already includes the Bootstrap 5 configurations.
	* Install NodeJS LTS (Long Time Support) version from this website
	* Install Firebase: ***npm install firebase***
	* Install EmailJS: ***npm install emailjs-com***
	* Run the application using the following command: ***npm start***


<a name="instructions"></a>
## Firebase Hosting Deployment
This subsection will show how we deployed our website to Firebase. 

Prerequisites:
* Working local copy of the project.
* Firebase CLI installed and set up.
* Access to the associated Google account (which was given to the client).

### Deployment Steps:
1. Ensure the code functions as expected and you have all the necessary files and configurations.
2. Open your Command Prompt/Terminal.
3. Run ***npm run build*** to update the application.
4. Deploy using the command: ***npx firebase deploy*** 
5. Upon successful deployment, a message displaying “Deploy complete!” and the Hosting URL will appear. You can access your deployed application by following the provided URL.

### Verification:
Visit [Firebase's official site.](https://firebase.google.com/)
Log in with the Google account 
Click “Go to console” on the top right.
Select the “team-pwd” project.
Under project shortcuts, click on “Hosting”. This will display the latest releases of your deployed application.
Access the application by clicking on the Hosting URL link under domains.

### Troubleshooting:
If you encounter any issues, refer to [Firebase's official documentation.](https://firebase.google.com/docs/cli)

