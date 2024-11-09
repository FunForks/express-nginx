Place the `app.conf` file in 

   > Ubuntu: `etc/nginx/sites-enabled/app.conf`*,  
   > Mac:`/opt/homebrew/etc/nginx/servers/app.conf`
   
_\* Usually, you will create a `.conf` filein `etc/nginx/sites-available/app.conf`, and then use [`ln -s`](https://www.freecodecamp.org/news/linux-ln-how-to-create-a-symbolic-link-in-linux-example-bash-command/) to create a soft link in the `sites-enabled/` folder._