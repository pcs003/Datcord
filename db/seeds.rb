# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Server.destroy_all
ServerMember.destroy_all
Channel.destroy_all
ChannelMessage.destroy_all
Friendship.destroy_all
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('servers')
ApplicationRecord.connection.reset_pk_sequence!('server_members')
ApplicationRecord.connection.reset_pk_sequence!('channels')
ApplicationRecord.connection.reset_pk_sequence!('channel_messages')
ApplicationRecord.connection.reset_pk_sequence!('friendships')

u1 = User.create!({email:"demouser@datcord.com", username: "DemoUser", password: "password123", birthdate: "1/1/2000"})
u2 = User.create!({email:"testuser01@test.com", username: "John Cena", password: "password123", birthdate: "2/2/2002"})
u3 = User.create!({email:"testuser02@test.com", username: "Owen Wilson", password: "password123", birthdate: "3/3/2003"})
u4 = User.create!({email:"testuser03@test.com", username: "Elon Musk", password: "password123", birthdate: "4/4/2004"})
u5 = User.create!({email:"testuser04@test.com", username: "Gordon Hayward", password: "password123", birthdate: "5/5/2005"})
u6 = User.create!({email:"testuser05@test.com", username: "Lebron James", password: "password123", birthdate: "6/6/2006"})
u7 = User.create!({email:"testuser06@test.com", username: "Faker", password: "password123", birthdate: "7/7/2007"})

f1 = Friendship.create!({friender_id: 1, friendee_id: 7, accepted: true});
f2 = Friendship.create!({friender_id: 1, friendee_id: 6, accepted: true});
f3 = Friendship.create!({friender_id: 1, friendee_id: 4, accepted: false});
f4 = Friendship.create!({friender_id: 2, friendee_id: 1, accepted: true});
f5 = Friendship.create!({friender_id: 5, friendee_id: 1, accepted: true});

s1 = Server.create!({name:"Coder Compadres", owner_id: 1})
s2 = Server.create!({name:"Gamer Gang", owner_id: 7})
s3 = Server.create!({name:"Meme Militia", owner_id: 4})
s4 = Server.create!({name:"Actor Association", owner_id: 3})
s5 = Server.create!({name:"Athlete Army", owner_id: 6})

sm1 = ServerMember.create!({member_id:4, server_id:1})
sm15 = ServerMember.create!({member_id:1, server_id:1})

sm2 = ServerMember.create!({member_id:1, server_id:2})
sm3 = ServerMember.create!({member_id:5, server_id:2})
sm16 = ServerMember.create!({member_id:7, server_id:2})

sm4 = ServerMember.create!({member_id:1, server_id:3})
sm5 = ServerMember.create!({member_id:2, server_id:3})
sm6 = ServerMember.create!({member_id:3, server_id:3})
sm7 = ServerMember.create!({member_id:6, server_id:3})
sm17 = ServerMember.create!({member_id:4, server_id:3})

sm8 = ServerMember.create!({member_id:1, server_id:4})
sm9 = ServerMember.create!({member_id:2, server_id:4})
sm10 = ServerMember.create!({member_id:6, server_id:4})
sm18 = ServerMember.create!({member_id:3, server_id:4})

sm11 = ServerMember.create!({member_id:1, server_id:5})
sm12 = ServerMember.create!({member_id:2, server_id:5})
sm13 = ServerMember.create!({member_id:5, server_id:5})
sm14 = ServerMember.create!({member_id:7, server_id:5})
sm19 = ServerMember.create!({member_id:6, server_id:5})

c1 = Channel.create!({name:"Ruby", server_id:1, channel_type:"text"})
c2 = Channel.create!({name:"Javascript", server_id:1, channel_type:"text"})
c3 = Channel.create!({name:"CSS", server_id:1, channel_type:"text"})
c4 = Channel.create!({name:"HTML", server_id:1, channel_type:"text"})
c5 = Channel.create!({name:"Discussions", server_id:1, channel_type:"voice"})
c6 = Channel.create!({name:"Interviews", server_id:1, channel_type:"voice"})

c24 = Channel.create!({name:"General", server_id:2, channel_type:"text"})
c7 = Channel.create!({name:"League", server_id:2, channel_type:"text"})
c8 = Channel.create!({name:"Genshin", server_id:2, channel_type:"text"})
c9 = Channel.create!({name:"Game Nights", server_id:2, channel_type:"voice"})
c10 = Channel.create!({name:"CoD", server_id:2, channel_type:"text"})
c11 = Channel.create!({name:"Comms", server_id:2, channel_type:"voice"})

c12 = Channel.create!({name:"General", server_id:3, channel_type:"text"})
c13 = Channel.create!({name:"Formats", server_id:3, channel_type:"text"})

c14 = Channel.create!({name:"General", server_id:4, channel_type:"text"})
c15 = Channel.create!({name:"Gigs", server_id:4, channel_type:"text"})
c16 = Channel.create!({name:"Awards", server_id:4, channel_type:"text"})
c17 = Channel.create!({name:"General", server_id:4, channel_type:"voice"})

c18 = Channel.create!({name:"General", server_id:5, channel_type:"text"})
c19 = Channel.create!({name:"Postgame Stats", server_id:5, channel_type:"text"})
c20 = Channel.create!({name:"Game1", server_id:5, channel_type:"voice"})
c21 = Channel.create!({name:"Game2", server_id:5, channel_type:"voice"})
c22 = Channel.create!({name:"Game3", server_id:5, channel_type:"voice"})

cm1 = ChannelMessage.create!({body:"Rails Magic", author_id:1, channel_id:1})
cm2 = ChannelMessage.create!({body:"snake case >>>", author_id:1, channel_id:1})
cm3 = ChannelMessage.create!({body:"I'm better than you at programming :)", author_id:4, channel_id:1})
cm4 = ChannelMessage.create!({body:":(", author_id:1, channel_id:1})
cm5 = ChannelMessage.create!({body:"Can someone explain react websockets to me", author_id:1, channel_id:2})
cm6 = ChannelMessage.create!({body:"No", author_id:4, channel_id:2})

cm7 = ChannelMessage.create!({body:"I play League", author_id:5, channel_id:8})
cm8 = ChannelMessage.create!({body:"same", author_id:7, channel_id:8})



