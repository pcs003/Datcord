@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :author_id, :channel_id, :edited

        json.author do 
            json.extract! message.author, :id, :username
        end
    end
end