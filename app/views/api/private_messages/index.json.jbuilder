@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :sender_id, :recipient_id, :created_at

        json.sender do 
            json.extract! message.sender, :id, :username
        end

        json.recipient do 
            json.extract! message.recipient, :id, :username
        end
    end
end