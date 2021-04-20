class PrivateMessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_for "private_messages_channel#{params[:recipientId]}"
  end
  
  def speak(data)
    puts data
    socket = {message:{ body: data['body'], sender_id: data["senderId"], recipient_id: data["recipientId"] }}
    PrivateMessagesChannel.broadcast_to("private_messages_channel#{data["recipientId"]}", socket)
  end
  
  def unsubscribed; end
end
