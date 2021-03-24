json.array! @servers do |server|
    json.id server.id 
    json.name server.name 
    json.owner_id server.owner_id
    json.invite_code server.invite_code

    json.members server.members do |member|
        json.id member.id
        json.username member.username
    end

    json.channels do
        server.channels.each do |channel|
            json.set! channel.id do
                json.extract! channel, :id, :name
            end
        end
    end
end