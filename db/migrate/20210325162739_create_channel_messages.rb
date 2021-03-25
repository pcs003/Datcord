class CreateChannelMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :channel_messages do |t|
      t.text :body, null:false
      t.integer :author_id, null:false
      t.integer :channel_id, null:false
      t.timestamps
    end

    add_index :channel_messages, :author_id
    add_index :channel_messages, :channel_id
  end
end
