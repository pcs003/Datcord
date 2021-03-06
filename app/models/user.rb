class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, :birthdate, presence:true
    validates :email, :session_token, uniqueness:true
    validates :password, length: {minimum:6}, allow_nil: true
    validates :username, length: {minimum:2, maximum: 32}
    validates_format_of :email,:with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
    
    has_many :owned_servers,
        foreign_key: :owner_id,
        class_name: :Server
    
    has_many :owned_channels,
        through: :owned_servers,
        source: :channels
    
    has_many :server_member_connections,
        foreign_key: :member_id,
        class_name: :ServerMember
    
    has_many :server_memberships,
        through: :server_member_connections,
        source: :server,
        dependent: :destroy
    
    has_many :channel_messages,
        foreign_key: :author_id,
        class_name: :ChannelMessage

    has_many :friendships_added,
        foreign_key: :friender_id,
        class_name: :Friendship
    
    has_many :friendships_accepted,
        foreign_key: :friendee_id,
        class_name: :Friendship

    has_many :friends_added,
        through: :friendships_added,
        source: :friendee

    has_many :friends_accepted,
        through: :friendships_accepted,
        source: :friender

    has_many :received_pms,
        foreign_key: :recipient_id,
        class_name: :PrivateMessage
    
    has_many :sent_pms,
        foreign_key: :sender_id,
        class_name: :PrivateMessage

    attr_reader :password

    after_initialize :ensure_session_token

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.check_password?(password)
            return user
        end
        nil
    end

    def check_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def generate_session_token
        self.session_token = SecureRandom.urlsafe_base64(16)
        # while User.find_by(session_token: self.session_token)
        #     self.session_token = SecureRandom.urlsafe_base64(16)
        # end
        # self.session_token
    end

    def reset_session_token
        generate_session_token
        save!
        self.session_token
    end

    def ensure_session_token
        if !self.session_token
            generate_session_token
        end
    end

end
