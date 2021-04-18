json.extract! user, :id, :username, :email, :friendships_accepted, :friendships_added

json.friends user.friends_added + user.friends_accepted do |friend|
    json.id friend.id
    json.username friend.username
end