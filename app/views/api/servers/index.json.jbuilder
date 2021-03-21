json.array! @servers do |server|
    json.id server.id 
    json.name server.name 
    json.owner_id server.owner_id

    json.members server.members do |member|
        json.id member.id
        json.username member.username
    end
end