class Api::ServersController < ApplicationController
    
    def index
        # @servers = Server.all
        @servers = current_user.server_memberships 
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

    def join
        @server = Server.find_by(invite_code: params[:inviteCode])
    
        if @server
            if current_user.server_memberships.include?(@server)
                render json: ["You're already part of this server"], status: 422
            else
                ServerMember.create!({member_id: current_user.id, server_id: @server.id})
                render 'api/servers/show'
            end
        else
            render json: ["Invalid invite code"], status: 422
        end
    end

    def leave
        @server = current_user.server_memberships.find_by(id: params[:serverId])
        @server_membership = ServerMember.find_by(member_id: current_user.id, server_id: params[:serverId])
        
        if @server && @server_membership
            @server_membership.destroy
            render json: @server.id
        else
            render json: ["Failed to leave server"], status: 422
        end
    end

    private

    def server_params
        params.require(:server).permit(:name, :owner_id)
    end
end
