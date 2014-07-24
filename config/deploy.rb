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

   task :restart, :roles => :all do
       sh ~/Sandbox/reboot.sh
   end

end
