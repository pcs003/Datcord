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
u2 = User.create!({email:"testuser02@test.com", username: "testuser02", password: "password123", birthdate: "2/2/2000"})

s1 = Server.create!({name:"test server", owner_id: 1})

sm1 = ServerMember.create!({member_id:2, server_id:1})