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
<li><h2>System flow Design</h2></li>
<img src="https://user-images.githubusercontent.com/42626745/127575821-9828c0fe-a667-4bfd-8990-f7a8d6ee40d6.png" alt="System flow diagram">
</ol>

<ol>
    <li><h2>Entites relation diagram</h2></li>
    <img src=https://user-images.githubusercontent.com/42626745/127579251-260eae1d-2679-4e9b-931d-0746043c4080.png alt="Entity diagram"> </ol>

