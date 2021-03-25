class ChannelMessage < ApplicationRecord
    validates :body, presence:true

    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
end
