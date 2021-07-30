# Monitoring_RESTFul_API


<h1>Features</h1>
<ul>
<li> <strong>Sign-up with email verification </strong>  
    <br>
    <p><ul>
            <li>User will have a name, email and password with validation test on them; email must be a correct one and password should be more than 6 character </li>
            <li>Passwords are hashed and stored in database, salting times are controllable through the config file (as salting dependent on the processor of the server’s machine), so if database is hacked, passwords are still safe </li>
        </ul></p>
</li>

<li> <strong>Stateless authentication using JWT :  </strong>  
    <br>
    <p><ul>
            <li>After user logged in , a token is created and saved in a cookie in the headers of the browser , 
                the cookie has max age ( is controllable through the config file ) and after that cookie is expired and to login again, you have to create a new JWT inside a new Cookie. 
                 </li>
                 <li>Generation of the cookie and the JWT depends on the hased password not the real one. This is more secure.
                     </li>
        </ul></p>
</li>
<li> <strong>Users can create a check to monitor a given URL if it is up or down.</strong>  
    <br>
    <p><ul>
            <li>Users can create a check to monitor a given URL if it is up or down.
                The check is unique for each user (user email + check name are primary key) so you can’t create two checks with the same name (other user can create a check with the same name and the two checks will be treated as two different checks) 
             </li>
                 <li>The creation process is secured by the JWT Authentication. 
                     </li>
        </ul></p>
</li>
<li> <strong>Users can edit, pause, or delete their checks if needed.</strong>  
    <br>
    <p><ul>
                 <li>User can only edit, pause or delete his checks as the check’s APIs are protected by authentication token 
                     </li>
        </ul></p>
</li>
<li> <strong>Users may receive a notification on a webhook URL by sending HTTP POST request whenever a check goes down or up </strong>  
    <br>
    <p><ul>
                 <li>On the creation of a check, user can provide a webhook URL, and the server will send to the user all the history of all reports
                      (Server sending as real time sending) 
                     </li>
        </ul></p>
</li>
<li> <strong>Users receive email alerts whenever down checks exceed the number of the threshold defined by the user.</strong>  
    <br>
    <p><ul>
                 <li>The master e-mail (which sends the emails to the users is controllable (config file)
                     </li>
        </ul></p>
</li>
<li> <strong>Users can get detailed uptime reports contains:</strong>  
    <br>
    <p><ul>
                 <li>Their checks availability</li>
                 <li>Average response time</li>
                 <li>Total uptime period /downtime period</li>
                 <li>Timestamp of each check</li>
                 <li>Count of uptime checks and downtime</li>
                 <li>Status</li>
        </ul></p>
</li>
<li> <strong>Users can group their checks by tags and get reports by tag</strong>  
    <br>
    <p><ul>
                 <li>User can edit,remove,add tags
                    </li>
        </ul></p>
</li>
</ul>

<h1>Diagrams</h1>
<ol>
    <li><h2>System flow Design</h2>
        <img src="https://user-images.githubusercontent.com/42626745/127575821-9828c0fe-a667-4bfd-8990-f7a8d6ee40d6.png" alt="System flow diagram">
        <h3>The server is doing two main process </h3>
        <ol>
           <li>
               <h4>RESTful APIs Response</h4>
                <p>Respont to the Allowed CRUD operations on database from the client.Allowed here means that the client is authorizated to only CRUD on his data </p>
           </li>
            <li>
                <h4>Polling function</h4>
                <ul>
                    <li>Read All data from the database</li>
                    <li>Run each check and generate reports</li>
                    <li>check that data in database is the same as the last processed data</li>
                    <li>if any change happended to a check, system will <strong>only update</strong> the changed check , so other checks and reports are running normally without any pause</li>
                   <li>Polling function using setInterval function , so the RESTful requests will not pause the checks to respond to client</li>
                </ul>
            </li>
      </ol> 
    </li>  
    <li><h2>Entites relation diagram</h2>
        <img src=https://user-images.githubusercontent.com/42626745/127598804-cfbe7383-3454-4258-8a40-8353ca5964a2.png alt="Entity diagram">  
        <ol>
            <li><h4>User/Check entities relation</h4>
                <p><strong>One to One relation</strong> with email as primary and forigen key for both of them</p>
            </li>
            <li><h4>Check/Report entities relation</h4>
                <p><strong>One to One relation</strong> with email and name as combined primary and forigen key for both of them</p>
            </li>
            <li><h4>Why I made check and report two different things ?</h4>
                <p><strong>Because of normalization</strong></p>
            </li>
        </ol>  
    </li>
</ol>


<h1>How to run the server</h1>

<ol>
    <li>
        <h2>RESTful APIs</h2>
        <ul>
            <li>
                <h3>User APIs</h3>
                <ul>
                    <li>
                        <h4>POST</h4>
                        <ul>
                            <li>Register
                                <p>/api/user/register</p>
                            </li>
                            <li>Login
                                <p>/api/user/login</p>
                            </li>
                            <li>Logout</li>
                            <p>/api/user/logout</p>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <h3>Check APIs</h3>
            <li>
                <h4>GET</h4>
                <ul>
                    <li>Read one check
                        <p>/api/check/read/one/:check_name</p>
                    </li>
                    <li>Read All
                        <p>/api/check/read/all</p>
                    </li>
                    <li>Read Tag
                        <p>/api/check/read/tag/:tag_name</p>
                    </li>
                </ul>
            </li>
            <li>
                <h4>POST</h4>
                <ul>
                    <li>Create
                        <p>/api/check/create</p>
                    </li>
                    <li>Pause
                        <p>/api/check/pause</p>
                    </li>
                    <li>Active
                        <p>/api/check/active</p>
                    </li>
                </ul>
            </li>
            <li>
                <h4>PATCH</h4>
                <ul>
                    <li>Update name
                        <p>api/check/update/check/name</p>
                    </li>
                    <li>Update URL
                        <p>api/check/update/check/URL</p>
                    </li>
                    <li>add tag
                        <p>api/check/update/tags/add</p>
                    </li>
                    <li>Update one tag
                        <p>api/check/update/tags/one</p>
                    </li>
                </ul>
            </li>
            <li>
                <h4>DELETE</h4>
                <ul>
                    <li>Delete one check
                        <p>api/check/delete/check/one</p>
                    </li>
                    <li>Delete all checks
                        <p>api/check/delete/check/all</p>
                    </li>
                    <li>Delete all tags
                        <p>api/check/delete/tags/all</p>
                    </li>
                    <li>Delete one Tag
                        <p>api/check/delete/tags/one</p>
                    </li>
                </ul>
           </li>
</li>
    <li>
        <h3>Report APIs</h3>
    <li>
        <h4>GET</h4>
        <ul>
            <li>Read All Reports
                <p>/api/report/read/all</p>
            </li>
            <li>Read One Report
                <p>/api/report/read/name/:report_name</p>
            </li>
            <li>Read by Tag
                <p>/api/report/read/tag/:tag_name</p>
            </li>
        </ul>
    </li>
    </li>
</ul>
</li>
<li>
     <h2>Configurations</h2>
    <p>You have to edit your own config file to run the server,config file here on github is empty</p>
    <ul>
        <li> PORT  </li>
        <li> MONGO_URI </li>
        <p>you can use your own Mongo Atlas database cloud just be pasteing your database's link here</p> 
        <li> SALTING_RATE </li>
        <li> ACCESS_TOKEN_SECRET</li>
        <li> TOKEN_MAX_AGE_IN_SEC</li> 
        <li> SENDER_EMAIL</li>
       <li> SENDER_EMAIL_PASSWORD</li> 
       <p>Note: You have to configure your email to be able to sent emails , the following link makes the server able to send emails by your email.<a href="https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4Nup2vghZ0_X7nag49iZFRG_b2RGbeaRi9ERqZ37gl5nFBy_XczxqiouH0q1eS9zR-xKz48PXIXgppvsEHffFscRZ-gRA"> Link</a><br>You can use other email than your primative one   </p> 
    </ul>
</li>
<li><h2>Dependencies</h2></li>
<ul>
    <li>"axios": "^0.21.1",</li>
    <li>"bcryptjs": "^2.4.3",</li>
    <li>"cookie-parser": "^1.4.5",</li>
    <li>"dotenv": "^10.0.0",</li>
    <li>"express": "^4.17.1",</li>
    <li>"joi": "^17.4.1",</li>
    <li>"jsonwebtoken": "^8.5.1",</li>
    <li>"mongoose": "^5.13.3",</li>
    <li>"nodemailer": "^6.6.3"</li>
</ul>
</ol>
<h1>The Code</h1>
<ol>
    <li><h2>Code Tree</h2>
            <img src="https://user-images.githubusercontent.com/42626745/127660025-05908d1f-b74f-4d1c-be8b-70e9f0abffd8.png" alt="main file">
    </li>
    <li> <h2>main file</h2>
    <img src="https://user-images.githubusercontent.com/42626745/127659303-bb4f3d2e-d3ed-473c-a777-22469963be9c.png" alt="main file">
    </li>
    <li><h2>main function</h2>
    <img src="https://user-images.githubusercontent.com/42626745/127659397-db9c2ff8-8e56-4a68-97a8-bd344b99718c.png" alt="main function">
    </li>
</ol>
<h1>The Report Process</h1>
<p>In this section, I will post screen shoots for real tests for 4 websites,<strong>I will discuss the history in other section</strong> </p>
    <ul>
        <li><h3>Google</h3>
            <ol>
                <li><h4>Check parameters</h4>
                    <img src="https://user-images.githubusercontent.com/42626745/127663194-f119841f-fd9e-4abd-b0e9-8dcb9ee97c6e.png" alt=""> 
                    <p>Here the check is doing checking every 5 seconds and with a timeout space 2 seconds , user entered a link as a webhook to recieve reports logger by just post request <strong>will discuss report in history section</strong>. 
                    user will recieve an email if the site is down 100 times <strong>(I put large number to prevent sending emails while doing this test)</strong> </p>
                </li>
                <li><h4>Report parameters</h4>
                    <img src="https://user-images.githubusercontent.com/42626745/127663233-2db45112-60e1-499c-a894-550fddb27cd0.png" alt=""> 
                    <p>Report here is visualize the last status of the check,logs are saved in history. the Timestamp here is for the date of last report.</p>
                    <p>Here Google makes 192 successful connections and 11 failures, then availability is 94%. During the test Google was up for 960 seconds and down for 55 seconds,average responsetime is 792 ms.</p>                </li>
            </ol>
        </li>
        <li><h3>Facebook</h3> <ol>
            <li><h4>Check parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127663096-27ba3b49-7376-434d-9c60-588de9039dd4.png" alt=""> 
                <p>Here the check is doing checking every 10 seconds and with a timeout space 2 seconds , user entered a link as a webhook to recieve reports logger by just post request <strong>will discuss report in history section</strong>. 
                    user will recieve an email if the site is down 100 times <strong>(I put large number to prevent sending emails while doing this test)</strong> </p>            </li>
            <li><h4>Report parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127663134-7af4dbb2-049f-4a38-b6be-76bbd6235966.png" alt=""> 
                <p>Report here is visualize the last status of the check,logs are saved in history. the Timestamp here is for the date of last report.</p>
                <p>Here Facebook makes 89 successful connections and 10 failures, then availability is 89%. During the test Facebook was up for 890 seconds and down for 100 seconds,average responsetime is 1098 ms.</p>
            </li>
        </ol></li>
        <li><h3>Twitter</h3> <ol>
            <li><h4>Check parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127663330-c00dd5c3-cf41-4e53-8af8-1880418d626e.png" alt=""> 
                <p>Here the check is doing checking every 10 seconds and with a timeout space 2 seconds , user entered a link as a webhook to recieve reports logger by just post request <strong>will discuss report in history section</strong>. 
                    user will recieve an email if the site is down 100 times <strong>(I put large number to prevent sending emails while doing this test)</strong> </p>            </li>
            <li><h4>Report parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127663297-e44766d5-6999-470e-ab7c-6a81df4c9a83.png" alt=""> 
                <p>Report here is visualize the last status of the check,logs are saved in history. the Timestamp here is for the date of last report.</p>
                <p>Here Twitter makes 95 successful connections and 2 failures, then availability is 97%. During the test Twitter was up for 950 seconds and down for 20 seconds,average responsetime is 1093 ms.</p>
            </li>
        </ol></li>
        <li><h3>Unexisted website</h3> <ol>
            <li><h4>Check parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127663364-27523d37-cb41-42e2-8e57-7d7276512ec9.png" alt=""> 
                <p>Here the check is doing checking every 10 seconds and with a timeout space 2 seconds , user entered a link as a webhook to recieve reports logger by just post request <strong>will discuss report in history section</strong>. 
                    user will recieve an email if the site is down 100000 times <strong>(I put large number to prevent sending emails while doing this test)</strong> </p>            </li>
            <li><h4>Report parameters</h4>
                <img src="https://user-images.githubusercontent.com/42626745/127667349-df2874c5-9d83-4dc3-ba3a-3c60806f5b90.png" alt=""> 
                <p>Report here is visualize the last status of the check,logs are saved in history. the Timestamp here is for the date of last report.</p>
                <p>Here Unexisted website makes 0 successful connections and 94 failures, then availability is 0%. During the test it was up for 0 seconds and down for 940 seconds,average responsetime is 1600 ms <strong>as timeout triggerd so response time is arround the timeout which was 2000 ms</strong> .</p>            </li>
        </ol></li>
    </ul>
  <h1>History</h1>
    <ol>
        <li><h4>history array</h4>
        <p>history array containing all logs of reports , after the check finshes the report , it pushes an history log in history array before the next update</p></li>
        <img src="https://user-images.githubusercontent.com/42626745/127668944-adc0ea6f-3b45-40a0-95da-89829274d015.png" alt=""> 
        <li><h4>history array elements</h4>
        <p>Here a look for each log. you can check updates and on the top the report is updated</p>
        <img src="https://user-images.githubusercontent.com/42626745/127668996-2262111d-df00-4e8b-9ceb-64bf886dc487.png" alt=""> 
    </li>
    </ol>

