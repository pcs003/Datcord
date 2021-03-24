json.server do
    json.extract! server, :id, :name, :owner_id, :invite_code

    json.members server.members do |member|
        json.extract! member, :id, :username
    end

    json.channels do
        @server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :id, :name
            end
        end
    end
end

