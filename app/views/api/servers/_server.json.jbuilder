json.server do
    json.extract! server, :id, :name, :owner_id

    json.members server.members do |member|
        json.username = member.username
    end
end

