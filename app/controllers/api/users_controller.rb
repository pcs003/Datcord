class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 422
        end   
    end

    def add_friend
        friendParam = params[:friendee_id]
        idx = friendParam.index('#')
        name = friendParam[0...idx]
        id = friendParam[idx + 1...friendParam.length].to_i
        @friend = User.find_by(id: id, username: name)
        @user = current_user

        if (@friend) 
            if (current_user.friends_added.include?(@friend) || current_user.friends_accepted.include?(@friend))
                render json: ["You're already friends with this person"], status: 422
            else
                Friendship.create!({friender_id: current_user.id, friendee_id: @friend.id, accepted: false})
                render 'api/users/show'
            end
        else
            render json: ["Invalid user"], status: 422
        end
        
    end

    def accept_friend
        @friendship = Friendship.find_by(id: [params[:friendship_id]])
        @user = current_user
        
        if @friendship
            @friendship.update(accepted: true)
            render 'api/users/show'
        else
            render json: ["Invalid friend request"], status: 422
        end
    end

    def remove_friend
        @friendship = Friendship.find_by(id: params[:friend_id])
        @user = current_user
        puts @friendship
        if @friendship
            @friendship.destroy
            render 'api/users/show'
        else
            render json: ["Failed to remove friend"], status: 422
        end
        
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password, :birthdate)
    end
end
