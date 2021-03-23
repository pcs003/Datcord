class Server < ApplicationRecord
    validates :name, presence: true
    validates :name, length: { minimum: 2, maximum: 100 }

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :member_connections,
        foreign_key: :server_id,
        class_name: :ServerMember,
        dependent: :destroy

    has_many :members,
        through: :member_connections,
        source: :member

    
    after_initialize :ensure_invite_code


    def generate_invite_code
        this_invite_code = '%06d' % rand(10 ** 6)

        if (Server.find_by(invite_code: this_invite_code))
            this_invite_code = '%06d' % rand(10 ** 6)
        end

        self.invite_code = this_invite_code
    end

    def ensure_invite_code
        if (!self.invite_code)
            generate_invite_code
        end
    end
end
