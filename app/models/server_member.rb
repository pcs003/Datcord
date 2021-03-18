class ServerMember < ApplicationRecord

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server,
        dependent: :destroy

    belongs_to :member,
        foreign_key: :member_id,
        class_name: :User,
        dependent: :destroy
end
