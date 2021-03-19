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
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('servers')
ApplicationRecord.connection.reset_pk_sequence!('server_members')

u1 = User.create!({email:"demouser@datcord.com", username: "DemoUser", password: "password123", birthdate: "1/1/2000"})
u2 = User.create!({email:"testuser01@test.com", username: "John Cena", password: "password123", birthdate: "2/2/2002"})
u3 = User.create!({email:"testuser02@test.com", username: "Owen Wilson", password: "password123", birthdate: "3/3/2003"})
u4 = User.create!({email:"testuser03@test.com", username: "Elon Musk", password: "password123", birthdate: "4/4/2004"})
u5 = User.create!({email:"testuser04@test.com", username: "Gordon Hayward", password: "password123", birthdate: "5/5/2005"})
u6 = User.create!({email:"testuser05@test.com", username: "Lebron James", password: "password123", birthdate: "6/6/2006"})
u7 = User.create!({email:"testuser06@test.com", username: "Faker", password: "password123", birthdate: "7/7/2007"})

s1 = Server.create!({name:"Coder Compadres", owner_id: 1})
s2 = Server.create!({name:"Gamer Gang", owner_id: 7})
s3 = Server.create!({name:"Meme Militia", owner_id: 4})
s4 = Server.create!({name:"Actor Association", owner_id: 3})
s5 = Server.create!({name:"Athlete Army", owner_id: 6})

sm1 = ServerMember.create!({member_id:4, server_id:1})

sm2 = ServerMember.create!({member_id:1, server_id:2})
sm3 = ServerMember.create!({member_id:5, server_id:2})

sm4 = ServerMember.create!({member_id:1, server_id:3})
sm5 = ServerMember.create!({member_id:2, server_id:3})
sm6 = ServerMember.create!({member_id:3, server_id:3})
sm7 = ServerMember.create!({member_id:6, server_id:3})

sm8 = ServerMember.create!({member_id:1, server_id:4})
sm9 = ServerMember.create!({member_id:2, server_id:4})
sm10 = ServerMember.create!({member_id:6, server_id:4})

sm11 = ServerMember.create!({member_id:1, server_id:5})
sm12 = ServerMember.create!({member_id:2, server_id:5})
sm13 = ServerMember.create!({member_id:5, server_id:5})
sm14 = ServerMember.create!({member_id:7, server_id:5})