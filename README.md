# Demo of serving an Express server with an Nginx reverse proxy #

***The following assumes that you will use 8888 as the port for your Express server.
If not, change the string `8888` in `app.js` and everywhere below to you preferred port number.***

1. [Edit your `hosts` file](https://www.hostinger.com/tutorials/how-to-edit-hosts-file)  
   > Ubuntu: `/etc/hosts`,  
   > MacOS: `/private/etc/hosts`
2. Add the following custom domain name:
  > ```
  > 127.0.0.1 app.local
  > ```

3. Install [Nginx](https://www.f5.com/go/product/welcome-to-nginx)  
    (Use [apt](https://ubuntu.com/tutorials/install-and-configure-nginx#2-installing-nginx) on Ubuntu, or [homebrew](https://formulae.brew.sh/formula/nginx) on MacOS)

4. Create a configuration file for `app.local`  
   > Ubuntu: `etc/nginx/sites-enabled/app.conf`*,  
   > Mac:`/opt/homebrew/etc/nginx/servers/app.conf`
   ```nginx
   server{
    listen 80;
    server_name app.local;
    location / {
        # Set the host header to be that of the Nginx server
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        # Instruct Nginx to proxy all requests matching the
        # location pattern to an upstream (backend) server
        proxy_pass http://127.0.0.1:8888;
    }
    ```
    _\* Usually, you will create a `.conf` file in `etc/nginx/sites-available/app.conf`, and then use [`ln -s`](https://www.freecodecamp.org/news/linux-ln-how-to-create-a-symbolic-link-in-linux-example-bash-command/) to create a soft link in the `sites-enabled/` folder._
    
5. Check that Nginx is properly configured : `nginx -t`  
   (You may have to use `sudo nginx -t`)
6. Restart Nginx  
   > Ubuntu: `sudo systemctl restart nginx` or `sudo service nginx restart`
   > Mac: `brew services restart nginx`
    
7. Run `node app.js`
8. Visit [http://app.local](http://app.local)
9. You should see something like this in your browser:
> ```pre
> Connection  
> from ::ffff:127.0.0.1  
> to   http://app.local  
> at   <local date and time>
> ```