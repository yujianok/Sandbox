default_run_options[:pty] = true
set :user, "darcy"
set :application, "Sandbox"
set :deploy_to, "/home/#{user}/#{application}"
set :use_sudo, false
# DEPLOYMENT SCHEME
set :scm, :none
set :repository, "./"
set :deploy_via, :copy

namespace :deploy do

   task :install, :roles => :web do
       "cd ~/Sandbox/; bower install"
       "cd ~/Sandbox/; npm install"
   end

   task :restart, :roles => :web do
      "cd ~/Sandbox/; forever restart start.js"
   end

end
