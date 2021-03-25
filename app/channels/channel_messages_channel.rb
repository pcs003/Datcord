class ChannelMessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_for "channel_messages_channel#{params[:channelId]}"
  end

  def speak(data)
    puts "got to speak"
    socket = {message:{ body: data['body'], author_id: data["authorId"], channel_id: data["channelId"] }}
    ChannelMessagesChannel.broadcast_to("channel_messages_channel", socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
