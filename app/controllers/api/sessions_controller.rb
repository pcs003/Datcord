class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )
        if @user
            login(@user)
            render 'api/users/show'
        else
            if (params[:user][:email] === "" && params[:user][:password] === "")
                render json: [' - This field is required', ' - This field is required'], status: 401
            elsif (params[:user][:email] != "" && params[:user][:password] === "")
                render json: ['', ' - This field is required'], status: 401
            elsif (params[:user][:email] === "" && params[:user][:password] != "")
                render json: [' - This field is required', ''], status: 401
            else
                render json: [' - Login or password is invalid', ' - Login or password is invalid'], status: 401
            end
            
        end
    end

    def destroy
        if logged_in?
            logout
            render json: {}
        else
            render json: ['no user logged in'], status: 404 
        end
    end

end