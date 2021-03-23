class ServerMember < ApplicationRecord

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server

    belongs_to :member,
        foreign_key: :member_id,
        class_name: :User
end
