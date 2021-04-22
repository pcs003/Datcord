class Api::PrivateMessagesController < ApplicationController
    def index
        @user = current_user
        @all_messages = @user.sent_pms + @user.received_pms
        @messages = @all_messages.select {|msg| msg.recipient_id == params[:recipientId].to_i || msg.sender_id == params[:recipientId].to_i}

        render 'api/private_messages/index'
    end

    def create
        @message = PrivateMessage.new(message_params)
        if @message.save
            render 'api/private_messages/show'
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = current_user.sent_pms.find_by(id: params[:id])
        if @message && @message.update(body:params[:body], edited:true)
            render 'api/private_messages/show'
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = current_user.sent_pms.find_by(id: params[:id])
        if @message
            @message.destroy
        else
            render json: ["Can't delete another user's message"], status: 422
        end
    end

    private

    def message_params
        params.require(:message).permit(:body,:sender_id,:recipient_id)
    end
end
