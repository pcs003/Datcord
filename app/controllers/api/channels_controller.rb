class Api::ChannelsController < ApplicationController
    def index
        @channels = Server.find(params[:serverId]).channels
        render :index
    end
    
    def show
        @channel = Channel.find_by(id: params[:id])
        render :show
    end
    
    def create
        @channel = Channel.new(channel_params)
        
        if @channel.save
            render :show
        else
            render json: ["Name field can't be empty"], status: 422
        end
    end

    def update
        @channel = current_user.owned_channels.find_by(id: params[:id])
        puts channel_params
        if @channel
            if @channel.update(channel_params)
                render :show
            else
                render json: ["Invalid params"], status: 422
            end
        else
            render json: ["Can't change this channel"], status: 422
        end
    end

    def destroy
        @channel = current_user.owned_channels.find_by(id: params[:id])
        if @channel
            @channel.destroy
        else
            render json: ["Can't destroy channel"], status: 404
        end
    end

    private

    def channel_params
        params.require(:channel).permit(:name, :server_id, :channel_type)
    end
end
