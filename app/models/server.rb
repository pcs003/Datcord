class Server < ApplicationRecord
    validates :name, presence: true
    validates :name, length: { minimum: 2, maximum: 100 }

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :member_connections,
        foreign_key: :server_id,
        class_name: :ServerMember

    has_many :members,
        through: :member_connections,
        source: :member
end
