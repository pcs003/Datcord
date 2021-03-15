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
            render json: 'invalid email and/or password', status: 422
        end
    end

    def destroy
        if logged_in?
            logout
            render json: {}
        else
            puts 'no one is logged in'
            render json: 'no user logged in', status: 404 
        end
    end

end