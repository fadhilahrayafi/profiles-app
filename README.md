# profiles-app
This app is for creating and storing profiles data
You can also edit and add work experiences here

## For Client side:
* React Next Js
* Typescript
* deployed on firebase https://profile-app-glints.web.app/

For Running it on local
* open Client folder => open profiles-app folder
* npm install
* npm run dev

--------------------------------------------------------

## For Server side:
* Node Js
* Express Js
* PSQL
* deployed on heroku url endpoint: https://profile-app-glints.herokuapp.com/

For Running it on local
* open Server folder
* npm install
* if you already install nodemon on your terminal run nodemon index
* if you haven't run node index
* server will running on port 5000

Endpont Path:
1. Get all profiles
    - Method: GET
    - PATH: https://profile-app-glints.herokuapp.com/profiles
    - RESPONSE: 
    ```
                [
                  {
                    profile_id: NUMBER,
                    name: STRING,
                    image: STRING,
                    age: NUMBER,
                    private: BOOLEAN
                  }
                 ]
      ```
                 
2. Get Profile by profile id     
    - Method: GET
    - PATH: https://profile-app-glints.herokuapp.com/profiles/:id
    - RESPONSE: 
    ```
                {
                  profile_id: NUMBER,
                  name: STRING,
                  image: STRING,
                  age: NUMBER,
                  private: BOOLEAN,
                  works: [
                             {
                                id: NUMBER,
                                profile_id: NUMBER,
                                company_name: STRING,
                                company_logo: STRING,
                                start_date: DATE STRING,
                                end_date: DATE STRING,
                                is_current: BOOLEAN,
                                title: STRING,
                                description: STRING
                              }
                            ]
                      }
    ```
    
3. Update Profile
    - Method: PUT
    - PATH: https://profile-app-glints.herokuapp.com/profile/:id
    - REQUEST BODY: 
    ```
                    {
                      profile_id: NUMBER,
                      name: STRING,
                      image: STRING,
                      age: NUMBER,
                      private: BOOLEAN
                     }
    ```
    - RESPONSE: 
    ```
                {
                  profile_id: NUMBER,
                  name: STRING,
                  image: STRING,
                  age: NUMBER,
                  private: BOOLEAN
                }
   ```  
     
5. Create Profile
    - Method: POST
    - PATH: https://profile-app-glints.herokuapp.com/profile
    - REQUEST BODY: 
    ```
                    {
                      name: STRING,
                      image: STRING,
                      age: NUMBER,
                      private: BOOLEAN
                     }
    ```
    - RESPONSE: {
                  profile_id: NUMBER,
                  name: STRING,
                  image: STRING,
                  age: NUMBER,
                  private: BOOLEAN
                } 
     ```
     
6. Delete Profile
    - Method: DELETE
    - PATH: https://profile-app-glints.herokuapp.com/profile:id
    - RESPONSE: 
    ```
    {"profile with id: ${id} was deleted"}
    ```

7. Create Work Experience
    - Method: POST
    - PATH: https://profile-app-glints.herokuapp.com/work
    - REQUEST BODY: 
    ```
                    {
                      profile_id: NUMBER,
                      company_name: STRING,
                      company_logo: STRING,
                      start_date: DATE STRING,
                      end_date: DATE STRING,
                      is_current: BOOLEAN,
                      title: STRING,
                      description: STRING
                     }
     ```                
    - RESPONSE: 
    ```
                {
                  id: NUMBER,
                  profile_id: NUMBER,
                  company_name: STRING,
                  company_logo: STRING,
                  start_date: DATE STRING,
                  end_date: DATE STRING,
                  is_current: BOOLEAN,
                  title: STRING,
                  description: STRING
                } 
    ```            
                
8. Update Work Experience
    - Method: PUT
    - PATH: https://profile-app-glints.herokuapp.com/work/:id
    - REQUEST BODY: 
    ```
                    {
                      id: NUMBER,
                      company_name: STRING,
                      company_logo: STRING,
                      start_date: DATE STRING,
                      end_date: DATE STRING,
                      is_current: BOOLEAN,
                      title: STRING,
                      description: STRING
                     }
    ```                 
    - RESPONSE: 
    ```
                {
                  id: NUMBER,
                  profile_id: NUMBER,
                  company_name: STRING,
                  company_logo: STRING,
                  start_date: DATE STRING,
                  end_date: DATE STRING,
                  is_current: BOOLEAN,
                  title: STRING,
                  description: STRING
                } 
   ```             
                
9. Delete Work Experience
    - Method: DELETE
    - PATH: https://profile-app-glints.herokuapp.com/work/:id
    - RESPONSE: 
    ```
    - {"works with id: ${id} was deleted"} 
    ```
