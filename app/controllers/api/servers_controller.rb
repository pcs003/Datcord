class Api::ServersController < ApplicationController
    
    def index
        # @servers = Server.all
        @servers = current_user.owned_servers + current_user.server_memberships 
        render 'api/servers/index'
    end

    def show
        @server = Server.find_by(id: params[:id])
        render 'api/servers/show'
    end

    def create
        @server = Server.new(server_params)

        if @server.save
            render 'api/servers/show'
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:id])

        if @server && @server.update(server_params)
            render 'api/servers/show'
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        if @server
            @server.destroy
            render json: []
        else
            render json: ['Server not found'], status: 404
        end
    end

    private

    def server_params
        params.require(:server).permit(:name, :owner_id)
    end
end
