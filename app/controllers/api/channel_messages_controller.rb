class Api::ChannelMessagesController < ApplicationController
    def index
        @channel = Channel.find(params[:channelId])
        @messages = @channel.messages
        
        render json: @messages.to_json(include: :author)
    end

    def create
        puts "creating"
        @message = ChannelMessage.new(message_params)
        if @message.save
            render 'api/channel_messages/show'
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = current_user.messages.find_by(id: params[:id])
        if @message && @message.update(message_params)
            render 'api/channel_messages/show'
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def destroy
        @message = current_user.messages.find_by(id: params[:id])
        if @message
            @message.destroy
        else
            render json: ["Can't delete another user's mesage"], status: 422
        end
    end

    private

    def message_params
        params.require(:message).permit(:body,:author_id,:channel_id)
    end
end
