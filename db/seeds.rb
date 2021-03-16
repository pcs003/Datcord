# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create!({email:"testuser01@test.com", username: "testuser01", password: "password123", birthdate: "1/1/2000"})
u2 = User.create!({email:"testuser02@test.com", username: "testuser02", password: "password123", birthdate: "2/2/2000"})