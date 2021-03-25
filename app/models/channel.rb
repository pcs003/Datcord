class Channel < ApplicationRecord
    validates :name, :server_id, :channel_type, presence: true
    validates :channel_type, inclusion: { in: %w(text voice), message: "%{value} is not a valid type"}

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server

    has_many :members,
        through: :server,
        source: :members

    has_many :messages,
        foreign_key: :channel_id,
        class_name: :ChannelMessage
end
