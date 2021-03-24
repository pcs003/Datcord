class Channel < ApplicationRecord
    validates :name, :server_id, :channel_type, presence: true
    validates :channel_type, inclusion: { in: %w(text voice), message: "%{value} is not a valid type"}

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server

    
end
